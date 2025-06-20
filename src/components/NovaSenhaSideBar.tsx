import React, { useState } from 'react';
import '../css/sidebar.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface NovaSenhaProps {
  open: boolean;
  onClose: () => void;    
  onBack: () => void;     
}

export default function NovaSenhaSidebar ({
  open,
  onClose,
  onBack,
}: NovaSenhaProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <form
          className="sidebar__form"
          onSubmit={handleSave}
          style={{ paddingTop: '1rem' }}
        >
          <div className="field currentPassword">
            <label htmlFor="currentPassword">Senha atual</label>
            <input
              id="currentPassword"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => setShowCurrent(v => !v)}
              aria-label={showCurrent ? "Esconder senha atual" : "Mostrar senha atual"}
            >
              {showCurrent ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>

          <div className="field">
            <label htmlFor="newPassword">Nova senha</label>
            <input
              id="newPassword"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => setShowNew(v => !v)}
              aria-label={showNew ? "Esconder nova senha" : "Mostrar nova senha"}
            >
              {showNew ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => setShowConfirm(v => !v)}
              aria-label={showConfirm ? "Esconder confirmação de senha" : "Mostrar confirmação de senha"}
            >
              {showConfirm ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>

          <div
            className="buttons"
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <button
              type="button"
              className="btn retornar" 
              style={{
                background: '#fff',
                color: 'var(--secondary-text-color)',
                minWidth: '120px',
                height: '48px',
                fontSize: '0.95rem',
                fontWeight: 'var(--bold)',
              }}
              onClick={onBack}
            >
              Retornar
            </button>

            <button
              type="submit"
              className="btn primary"
              style={{
                minWidth: '120px',
                height: '48px',
                fontSize: '0.95rem',
              }}
            >
              Salvar
            </button>
          </div>
        </form>

      </aside>

      {open && (
        <div className="sidebar__backdrop" onClick={onClose} />
      )}
    </>
  );
}
