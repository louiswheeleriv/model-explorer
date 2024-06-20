import { QuantityByStatus, UserModel, UserModelStatus } from "../types/models";

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

export function countByStatus(userModels: UserModel[]): QuantityByStatus {
  let result = {
    unassembled: 0,
    assembled: 0,
    in_progress: 0,
    finished: 0
  };
  userModels.forEach((um) => {
    result.unassembled += um.qty_unassembled;
    result.assembled += um.qty_assembled;
    result.in_progress += um.qty_in_progress;
    result.finished += um.qty_finished;
  });
  return result;
}
