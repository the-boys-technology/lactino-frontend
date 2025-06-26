import React, { useState } from 'react';
import '../css/sidebar.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { mudarSenha } from '../services/auth'; 
import { toast } from "react-toastify";

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

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });


  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>[\]\\\/\-_=+;']).{8,}$/;
    let isValid = true;

    if (!currentPassword) {
      newErrors.currentPassword = 'Informe a senha atual.';
      isValid = false;
    }

    if (!newPassword) {
      newErrors.newPassword = 'Informe a nova senha.';
      isValid = false;
    } else if (!passwordRegex.test(newPassword)) {
      newErrors.newPassword = 'A nova senha deve ter no mínimo 8 caracteres, um número e um símbolo.';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirme a nova senha.';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'A confirmação não coincide com a nova senha.';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    try {
      await mudarSenha({
        senhaAtual: currentPassword,
        novaSenha: newPassword,
        confirmarNovaSenha: confirmPassword,
      });

      setErrors({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      toast.success("Senha alterada com sucesso!");
      console.log("Senha alterada com sucesso!");
      onClose();
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(`${currentPassword}`);
      toast.error(`${newPassword}`);
      toast.error(`${confirmPassword}`);
      setErrors(prev => ({
        ...prev,
        currentPassword: 'Senha atual incorreta.',
      }));
    }
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
          {errors.newPassword && (<small className="error-text">{errors.newPassword}</small>)}

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
          {errors.confirmPassword && (<small className="error-text">{errors.confirmPassword}</small>)}

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
