interface MenuItemsProps {
  children: React.ReactNode;
  onClick: () => void;
}
const MenuItems: React.FC<MenuItemsProps> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 hover:bg-neutral-200 transition"
    >
      {children}
    </div>
  );
};

export default MenuItems;
