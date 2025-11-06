// src/services/api.ts
import type { Product } from '@/types/product';

const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL as string;
export const CURRENCY = '₹'; // per your preference

// ---- Utils ----
function assertEnv() {
  if (!PRODUCTS_URL) {
    throw new Error('VITE_PRODUCTS_URL is not set. Add it to your .env and restart Vite.');
  }
}

function withTimeout<T>(p: Promise<T>, ms = 15000, controller?: AbortController): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      controller?.abort();
      reject(new Error(`Request timed out after ${ms}ms`));
    }, ms);
    p.then(
      (v) => {
        clearTimeout(id);
        resolve(v);
      },
      (e) => {
        clearTimeout(id);
        reject(e);
      },
    );
  });
}

type ApiSuccess<T> = {
  status: 'success';
  httpStatus: number;
  data: T;
};

type ApiError = {
  status: 'error';
  httpStatus: number;
  message: string;
};

type ProductsList = {
  count: number;
  total: number;
  page: number;
  limit: number;
  items: Product[];
};

// ---- Core fetchers ----
export async function fetchProducts(opts?: {
  q?: string;
  page?: number;
  limit?: number;
  signal?: AbortSignal;
}): Promise<ProductsList> {
  assertEnv();

  const url = new URL(PRODUCTS_URL);
  if (opts?.q) url.searchParams.set('q', String(opts.q));
  if (opts?.page) url.searchParams.set('page', String(opts.page));
  if (opts?.limit) url.searchParams.set('limit', String(opts.limit));

  const ctrl = new AbortController();
  const signal = opts?.signal ?? ctrl.signal;

  const res = await withTimeout(
    fetch(url.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' }, // simple header → no preflight
      cache: 'no-store',
      signal,
    }),
    15000,
    ctrl,
  );

  const ctype = res.headers.get('content-type') || '';
  const isJson = ctype.includes('application/json');
  const fallbackText = isJson ? '' : await res.text();

  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status} ${res.statusText}\n` +
        (fallbackText ? fallbackText.slice(0, 400) : 'Non-OK response'),
    );
  }
  if (!isJson) {
    throw new Error(`Expected JSON, got ${ctype}\n${fallbackText.slice(0, 400)}`);
  }

  const payload = (await res.json()) as ApiSuccess<ProductsList> | ApiError;

  if ((payload as ApiError).status === 'error') {
    const err = payload as ApiError;
    throw new Error(`${err.httpStatus}: ${err.message}`);
  }

  const ok = payload as ApiSuccess<ProductsList>;
  // Defensive normalization
  if (!ok.data || !Array.isArray(ok.data.items)) {
    return { count: 0, total: 0, page: 1, limit: 0, items: [] };
  }
  return ok.data;
}

export async function fetchProductById(id: number | string, signal?: AbortSignal): Promise<Product | null> {
  assertEnv();

  const url = new URL(PRODUCTS_URL);
  url.searchParams.set('id', String(id));

  const ctrl = new AbortController();
  const effSignal = signal ?? ctrl.signal;

  const res = await withTimeout(
    fetch(url.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: effSignal,
    }),
    15000,
    ctrl,
  );

  const ctype = res.headers.get('content-type') || '';
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} ${res.statusText}\n${text.slice(0, 400)}`);
  }
  if (!ctype.includes('application/json')) {
    const text = await res.text();
    throw new Error(`Expected JSON, got ${ctype}\n${text.slice(0, 400)}`);
  }

  const payload = (await res.json()) as ApiSuccess<Product> | ApiError;
  if ((payload as ApiError).status === 'error') {
    const err = payload as ApiError;
    throw new Error(`${err.httpStatus}: ${err.message}`);
  }

  const ok = payload as ApiSuccess<Product>;
  return ok.data ?? null;
}

// ---- Helpers you can use in UI ----
export function formatCurrency(n?: number | string): string {
  if (n == null || n === '') return '';
  const num = typeof n === 'string' ? Number(n) : n;
  if (!Number.isFinite(num)) return String(n);
  return `${CURRENCY} ${num.toLocaleString('en-IN')}`;
}
