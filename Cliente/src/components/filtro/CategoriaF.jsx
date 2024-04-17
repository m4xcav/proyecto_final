import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";

const CategoriaF = ({setCate}) => {
  const urlBaseServer = "https://proyecto-final-sublikkar.onrender.com";
const [Categoria, setCategoria] = useState([]);

const getcategoria = async () => {
    const { data: cate } = await axios.get(`${urlBaseServer}/cate`);
    setCategoria([...cate.data]);
};

useEffect(() => {
    getcategoria();
}, []);

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className="w-72 font-medium h-50">
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
          : "Seleccionar  Categoría"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-40" : "max-h-0"
        } `}
      >
        {Categoria?.map((cate) => (
          <li
            key={cate?.id}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              cate?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              cate?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (cate?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(cate?.name);
                setOpen(false);
                setInputValue("");
                setCate(cate?.name);
              }
            }}
          >
            {cate?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriaF;