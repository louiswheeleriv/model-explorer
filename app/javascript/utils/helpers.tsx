import { QuantityByStatus, UserModel } from "../types/models";
import { v4 as uuidv4 } from 'uuid';

export function apiCall({ endpoint, method, urlParams, body }: { endpoint: string, method: string, urlParams?: object, body?: object }) {
  let finalEndpoint = endpoint;
  if (urlParams) finalEndpoint += '?' + new URLSearchParams(urlParams as Record<string, string>).toString();
  return fetch(finalEndpoint, {
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

async function getPresignedUrl(): Promise<string> {
  return apiCall({
    endpoint: '/user-assets/upload',
    method: 'GET'
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.status >= 300) throw new Error(body.error)
      return body.presigned_url;
    });
}

async function uploadImageToS3(presignedUrl: string, image: File): Promise<string> {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: image
  });
  return response.url.split('?')[0];
}

export async function uploadImage(image: File): Promise<string> {
  const presignedUrl = await getPresignedUrl();
  const imageUrl = await uploadImageToS3(presignedUrl, image);
  return imageUrl;
}

export function acceptableEmail(email: string) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

export function generateUuid() {
  return uuidv4();
}

export function friendlyDateTimeString(dateTimeString: string): string {
  const datePortion = friendlyDateString(dateTimeString);
  const timePortion = friendlyTimeString(dateTimeString);
  return datePortion + ' at ' + timePortion;
}

export function friendlyDateString(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const currentTime = new Date();
  switch(date.getDate()) {
    case currentTime.getDate():
      return 'Today';
    case currentTime.getDate() - 1:
      return 'Yesterday';
    default:
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  };
}

export function friendlyTimeString(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
}
