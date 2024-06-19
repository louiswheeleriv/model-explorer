import { QuantityByStatus, UserModelStatus } from "../types/models";

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

export function countByStatus(items: { status: UserModelStatus; quantity: number; }[]): QuantityByStatus {
  let result = {
    unassembled: 0,
    assembled: 0,
    in_progress: 0,
    finished: 0
  };
  items.forEach((item) => {
    let status = item.status;
    let qty = item.quantity;
    result[status] += qty;
  });
  return result;
}
