import React, {useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const Filtro = ({setfiltrovalue}) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const options = ["Mayor Precio", "Menor Precio", "Mayor Stock", "Menor Stock"];

  return (
    <div className="w-72 font-medium h-10">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Selecciona Filtro"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
  className={`bg-white mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"} `}
>
  {options.map((option) => (
    <li
      key={option} // Usa el nombre de la opción como clave
      className="p-2 text-sm hover:bg-sky-600 hover:text-white"
      onClick={() => {
        setSelected(option); // Actualiza el estado con la opción seleccionada
        setOpen(false); // Cierra el menú
        setInputValue(""); // Limpia el valor de entrada
        setfiltrovalue(option);
      }}
    >
      {option}
    </li>
  ))}
</ul>

    </div>
  );
};

export default Filtro;