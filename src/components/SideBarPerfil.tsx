import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';          
import '../css/sidebar.css';
import avatarImg from '../assets/avatar.jpg';
import { editarDados } from '../services/auth'; 

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onReset: () => void;   
}

export default function Sidebar({ open, onClose, onReset }: SidebarProps) {

  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);


  const [form, setForm] = useState({
    nome: '',
    email: '',
    cep: '',
    estado: '',
    cidade: '',
    fotoPerfil: '',
  });

  const [editable, setEditable] = useState({
    nome: false,
    cep: false,
  });

  useEffect(() => {
    const nome       = sessionStorage.getItem('nome')    || '';
    const email      = sessionStorage.getItem('email')   || '';
    const cep        = sessionStorage.getItem('cep')     || '';
    const estado     = sessionStorage.getItem('estado')  || '';
    const cidade     = sessionStorage.getItem('cidade')  || '';
    const fotoPerfil = sessionStorage.getItem('fotoPerfil') || '';

    setForm({ nome, email, cep, estado, cidade, fotoPerfil });

    if (fotoPerfil) {
      setPreviewImage(`data:image/jpeg;base64,${fotoPerfil}`);
    }
  }, []);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoPerfil(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };


  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const enableEdit = (field: keyof typeof editable) =>
    setEditable({ ...editable, [field]: true });

  const save = async () => {
    try {
      const base64Image = fotoPerfil
        ? await toBase64(fotoPerfil)
        : null;

      const payload = {
        nome: form.nome,
        cep: form.cep,
        fotoPerfil: base64Image,
      };

      await editarDados(payload);
      sessionStorage.setItem('nome', form.nome);
      sessionStorage.setItem('cep', form.cep);
      if (base64Image) {
        sessionStorage.setItem('fotoPerfil', base64Image);
        setPreviewImage(`data:image/jpeg;base64,${base64Image}`);
      }
      setEditable({ nome: false, cep: false });
      alert('Dados atualizados com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar os dados.');
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]; // only the base64 content
        resolve(base64);
      };
      reader.onerror = reject;
    });

  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar__profile">
          <label htmlFor="profile-pic-input">
            <img
              src={previewImage || avatarImg}
              alt="Foto de perfil"
              className="profile-img-clickable"
              title="Clique para mudar a foto"
            />
          </label>
          <input
            type="file"
            id="profile-pic-input"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleProfilePictureChange}
          />
        </div>


        <form className="sidebar__form" onSubmit={e => e.preventDefault()}>
          {/* Nome editável */}
          <div className="field">
            <label htmlFor="nome">Seu nome</label>
            <input
              id="nome"
              placeholder="Nome completo"
              value={form.nome}
              onChange={handleChange('nome')}
              readOnly={!editable.nome}
            />
            <button
              type="button"
              className="edit-btn"
              onClick={() => enableEdit('nome')}
              aria-label="Alterar nome"
            >
              <FaPen />
            </button>
          </div>

          {/* E-mail sempre readonly, sem botão de editar */}
          <div className="field">
            <label htmlFor="email">Seu e-mail</label>
            <input
              id="email"
              placeholder="E-mail"
              type="email"
              value={form.email}
              readOnly
              className="readonly-field"
            />
          </div>

          {/* CEP editável */}
          <div className="field">
            <label htmlFor="cep">Seu CEP</label>
            <input
              id="cep"
              placeholder="CEP"
              value={form.cep}
              onChange={handleChange('cep')}
              readOnly={!editable.cep}
            />
            <button
              type="button"
              className="edit-btn"
              onClick={() => enableEdit('cep')}
              aria-label="Alterar CEP"
            >
              <FaPen />
            </button>
          </div>

          {/* Estado e Cidade sempre disabled */}
          <div className="field">
            <label htmlFor="estado">Seu estado</label>
            <select
              id="estado"
              value={form.estado}
              onChange={handleChange('estado')}
              disabled
              className="readonly-field"
            >
              <option>{form.estado}</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="cidade">Sua cidade</label>
            <select
              id="cidade"
              value={form.cidade}
              onChange={handleChange('cidade')}
              disabled
              className="readonly-field"
            >
              <option>{form.cidade}</option>
            </select>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="btn primary"
              onClick={save}
            >
              Salvar alterações
            </button>
            <button
              type="button"
              className="btn danger"
              onClick={onReset}
            >
              Redefinir Senha
            </button>
          </div>
        </form>
      </aside>

      {open && <div className="sidebar__backdrop" onClick={onClose} />}
    </>
  );
}
