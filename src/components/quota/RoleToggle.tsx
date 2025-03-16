
interface RoleToggleProps {
  role: 'AM' | 'CSM';
  onRoleToggle: () => void;
}

export const RoleToggle = ({ role, onRoleToggle }: RoleToggleProps) => {
  return (
    <div className="flex justify-center items-center space-x-8 p-4 bg-white rounded-xl border border-[#D6BCFA]">
      <span className={`text-sm font-semibold transition-colors ${role === 'AM' ? 'text-[#1A1F2C]' : 'text-[#7E69AB]'}`}>
        AM
      </span>
      <div 
        className="w-14 h-7 rounded-full p-1 cursor-pointer bg-gray-100"
        onClick={onRoleToggle}
      >
        <div 
          className={`w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${
            role === 'CSM' ? 'translate-x-7' : ''
          }`} 
        />
      </div>
      <span className={`text-sm font-semibold transition-colors ${role === 'CSM' ? 'text-[#1A1F2C]' : 'text-[#7E69AB]'}`}>
        CSM
      </span>
    </div>
  );
};
