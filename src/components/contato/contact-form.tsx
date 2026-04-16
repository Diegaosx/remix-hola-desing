'use client';

import { useState, useTransition } from 'react';
import { sendContact } from '@/app/_actions/contact';

type State =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; errors?: Record<string, string> };

export function ContactForm() {
  const [state, setState] = useState<State>({ status: 'idle' });
  const [pending, startTransition] = useTransition();

  return (
    <form
      noValidate
      action={(formData) =>
        startTransition(async () => {
          const res = await sendContact(formData);
          if (res.ok) setState({ status: 'success', message: res.message });
          else setState({ status: 'error', message: res.message, errors: res.errors });
        })
      }
      className="space-y-12 max-w-2xl"
    >
      <Field
        name="name"
        label="Seu nome"
        placeholder="Como devemos lhe chamar?"
        error={state.status === 'error' ? state.errors?.name : undefined}
      />
      <Field
        name="email"
        type="email"
        label="E-mail corporativo"
        placeholder="nome@suaempresa.com"
        error={state.status === 'error' ? state.errors?.email : undefined}
      />
      <Field
        name="message"
        label="Mensagem"
        placeholder="Conte-nos sobre seu desafio"
        textarea
        error={state.status === 'error' ? state.errors?.message : undefined}
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
        className="w-full md:w-auto bg-white text-primary-container px-12 md:px-16 py-5 manrope-label font-bold hover:bg-primary hover:text-on-primary-fixed transition-colors disabled:opacity-50 focus-ring"
      >
        {pending ? 'Enviando…' : 'Enviar proposta'}
      </button>

      {state.status !== 'idle' && (
        <p
          role="status"
          className={`manrope-label ${state.status === 'success' ? 'text-primary' : 'text-error'}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  error?: string;
};

function Field({ name, label, placeholder, type = 'text', textarea, error }: FieldProps) {
  const id = `field-${name}`;
  const common =
    'w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 text-white placeholder:text-white/10 focus:ring-0 focus:outline-none focus:border-primary transition-all';
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="block manrope-label text-outline-variant mb-2 group-focus-within:text-primary transition-colors"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          required
          rows={1}
          placeholder={placeholder}
          className={`${common} resize-none`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          required
          placeholder={placeholder}
          className={common}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-error text-xs font-body">
          {error}
        </p>
      )}
    </div>
  );
}
