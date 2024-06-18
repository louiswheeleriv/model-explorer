import { UserModelStatus } from "../types/models";

export function apiCall({ endpoint, method, body}: {endpoint: string, method: string, body?: object}) {
  return fetch(endpoint, {
    method: String(method),
    headers: {
      'X-CSRF-Token': csrfToken(),
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });
}

function csrfToken(): string {
  if (!document) return '';
  const tokenData = document.querySelector('meta[name="csrf-token"]')
  if (!tokenData) return '';
  if ('content' in tokenData) return tokenData.content as string;
  return '';
}

// e.g. ['a', 'b', 'a', 'c'].filter(onlyUnique)
//   => ['a', 'b', 'c']
export function onlyUnique(value: any, index: number, array: any[]) {
  return array.indexOf(value) === index;
}

export function countByStatus(items: { status: UserModelStatus; quantity: number; }[]): Record<string, number> {
  return items.reduce((acc: Record<string, number>, item) => {
    let status = item.status;
    let qty = item.quantity;
    if (!acc[status]) acc[status] = 0;
    acc[status] += qty;
    return acc;
  }, {});
}
