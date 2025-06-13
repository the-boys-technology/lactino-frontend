import '../css/sidebar.css';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar__profile">
          <img src="/avatar.jpg" alt="Sua foto" />
          <h2>Nome completo</h2>
        </div>

        <ul className="sidebar__info">
          <li><strong>E-mail:</strong> usuário@exemplo.com</li>
          <li><strong>CEP:</strong> 59000-000</li>
          <li><strong>Estado:</strong> Rio Grande do Norte</li>
          <li><strong>Cidade:</strong> Natal</li>
        </ul>

        <button className="sidebar__danger">Redefinir senha</button>
      </aside>

      {open && <div className="sidebar__backdrop" onClick={onClose} />}
    </>
  );
}
