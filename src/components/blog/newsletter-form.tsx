'use client';

import { useState, useTransition } from 'react';
import { subscribeNewsletter } from '@/app/_actions/newsletter';

type Status = 'idle' | 'success' | 'error';

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) =>
        startTransition(async () => {
          const res = await subscribeNewsletter(formData);
          if (res.ok) {
            setStatus('success');
            setMessage(res.message);
          } else {
            setStatus('error');
            setMessage(res.message);
          }
        })
      }
      noValidate
      className="w-full max-w-xl"
    >
      <div className="flex flex-col md:flex-row gap-4 border-b border-white/20 pb-4">
        <label htmlFor="newsletter-email" className="sr-only">
          E-mail
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="SEU E-MAIL"
          className="bg-transparent border-none text-white manrope-label focus:ring-0 w-full placeholder:text-white/20 focus:outline-none"
        />
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={pending}
          className="manrope-label text-white hover:opacity-60 transition-opacity font-bold disabled:opacity-40"
        >
          {pending ? 'Enviando…' : 'Assinar'}
        </button>
      </div>
      {status !== 'idle' && (
        <p
          role="status"
          className={`mt-4 manrope-label ${status === 'success' ? 'text-primary' : 'text-error'}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
