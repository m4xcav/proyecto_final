CREATE DATABASE sublikkar
WITH
OWNER = postgres
ENCODING = 'UTF8'
LC_COLLATE = 'Spanish_Chile.1252'
LC_CTYPE = 'Spanish_Chile.1252'
LOCALE_PROVIDER = 'libc'
TABLESPACE = pg_default
CONNECTION LIMIT = -1
IS_TEMPLATE = False;

CREATE TABLE public.usuarios
(
    user_id SERIAL NOT NULL,
    user_nombre character varying(50) NOT NULL,
    user_email character varying(320) NOT NULL,
    user_telefono integer,
    user_perfil character varying(30) NOT NULL,
    user_password "char" NOT NULL,
    CONSTRAINT "Idusuario" PRIMARY KEY (user_id),
    CONSTRAINT email UNIQUE (user_email)
        INCLUDE(user_email)
);

CREATE TABLE public.productos
(
    prod_id SERIAL NOT NULL,
    prod_nombre character varying(100) NOT NULL,
    prod_descripcion character(320),
    prod_precio integer NOT NULL,
    prod_stock integer NOT NULL,
    catgoria_id integer NOT NULL,
    prod_img bytea NOT NULL,
    CONSTRAINT productoid PRIMARY KEY (prod_id)
);

CREATE TABLE public.carro
(
    carro_id SERIAL NOT NULL,
    prod_id integer NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT idcarro PRIMARY KEY (carro_id)
);

CREATE TABLE public.favoritos
(
    fav_id SERIAL NOT NULL,
    user_id integer NOT NULL,
    prod_id integer NOT NULL,
    CONSTRAINT idfavorito PRIMARY KEY (fav_id)
);

CREATE TABLE public.direcciones
(
    direc_id SERIAL NOT NULL,
    user_id integer NOT NULL,
    direc_nombre character varying(100) NOT NULL,
    direc_region character varying(100) NOT NULL,
    direc_comuna character varying(100) NOT NULL,
    direc_calle integer NOT NULL,
    direc_numero integer NOT NULL,
    direc_tel_contacto integer NOT NULL,
    CONSTRAINT direccionesid PRIMARY KEY (direc_id)
);

CREATE TABLE public.compras
(
    comp_id SERIAL NOT NULL,
    user_id integer NOT NULL,
    prod_id integer NOT NULL,
    CONSTRAINT idcompra PRIMARY KEY (comp_id)
);

CREATE TABLE public.categoria
(
    categoria_id SERIAL NOT NULL,
    categoria_name character varying(100) NOT NULL,
    CONSTRAINT categoriaid PRIMARY KEY (categoria_id)
);

ALTER TABLE  public.productos
    ADD CONSTRAINT prod_categoria_id FOREIGN KEY (catgoria_id)
    REFERENCES public.categoria (categoria_id) MATCH SIMPLE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE  public.carro
    ADD CONSTRAINT carro_prod_id FOREIGN KEY (prod_id)
    REFERENCES public.productos (prod_id) MATCH SIMPLE
    ON DELETE CASCADE
    NOT VALID;
CREATE INDEX fki_carro_prod_id
    ON public.carro(prod_id);


ALTER TABLE  public.carro
    ADD CONSTRAINT carro_user_id FOREIGN KEY (user_id)
    REFERENCES public.usuarios (user_id) MATCH SIMPLE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE  public.favoritos
    ADD CONSTRAINT fav_user_id FOREIGN KEY (user_id)
    REFERENCES public.usuarios (user_id) MATCH SIMPLE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE  public.favoritos
    ADD CONSTRAINT fav_prod_id FOREIGN KEY (prod_id)
    REFERENCES public.productos (prod_id) MATCH SIMPLE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE  public.direcciones
    ADD CONSTRAINT direct_user_id FOREIGN KEY (user_id)
    REFERENCES public.usuarios (user_id) MATCH SIMPLE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE  public.compras
    ADD CONSTRAINT com_user_id FOREIGN KEY (user_id)
    REFERENCES public.usuarios (user_id) MATCH SIMPLE
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE  public.compras
    ADD CONSTRAINT com_prod_id FOREIGN KEY (prod_id)
    REFERENCES public.productos (prod_id) MATCH SIMPLE
    ON DELETE CASCADE
    NOT VALID;