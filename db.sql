-- Table: public.User

-- DROP TABLE IF EXISTS public."User";

CREATE TABLE IF NOT EXISTS public."User"
(
    user_id integer NOT NULL DEFAULT nextval('"User_user_id_seq"'::regclass),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY (user_id),
    CONSTRAINT "User_email_key" UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;

-- Trigger: create_default_asset_holdings_trigger

-- DROP TRIGGER IF EXISTS create_default_asset_holdings_trigger ON public."User";

CREATE OR REPLACE TRIGGER create_default_asset_holdings_trigger
    AFTER INSERT
    ON public."User"
    FOR EACH ROW
    EXECUTE FUNCTION public.create_default_asset_holdings();
    
    -- Table: public.asset_holdings

-- DROP TABLE IF EXISTS public.asset_holdings;

CREATE TABLE IF NOT EXISTS public.asset_holdings
(
    holding_id integer NOT NULL DEFAULT nextval('asset_holdings_holding_id_seq'::regclass),
    user_id integer NOT NULL,
    cash_amount numeric(15,2) DEFAULT 0,
    assets_value numeric(15,2) DEFAULT 0,
    savings_balance numeric(15,2) DEFAULT 0,
    currency character varying(3) COLLATE pg_catalog."default",
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT asset_holdings_pkey PRIMARY KEY (holding_id),
    CONSTRAINT asset_holdings_user_id_key UNIQUE (user_id),
    CONSTRAINT asset_holdings_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public."User" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.asset_holdings
    OWNER to postgres;
    
    -- Table: public.node

-- DROP TABLE IF EXISTS public.node;

CREATE TABLE IF NOT EXISTS public.node
(
    n_id integer NOT NULL DEFAULT nextval('node_n_id_seq'::regclass),
    user_id integer NOT NULL,
    type integer NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    amount numeric(15,2),
    currency character varying(3) COLLATE pg_catalog."default",
    category character varying(100) COLLATE pg_catalog."default",
    "interval" character varying(50) COLLATE pg_catalog."default",
    date date,
    notes text COLLATE pg_catalog."default",
    deadline date,
    CONSTRAINT node_pkey PRIMARY KEY (n_id),
    CONSTRAINT node_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public."User" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT node_type_check CHECK (type = ANY (ARRAY[0, 1, 2])),
    CONSTRAINT deadline_check CHECK (deadline > date OR deadline IS NULL)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.node
    OWNER to postgres;

-- Trigger: update_cash_amount_expense_trigger

-- DROP TRIGGER IF EXISTS update_cash_amount_expense_trigger ON public.node;

CREATE OR REPLACE TRIGGER update_cash_amount_expense_trigger
    AFTER INSERT
    ON public.node
    FOR EACH ROW
    WHEN (new.type = 0)
    EXECUTE FUNCTION public.update_cash_amount_on_expense_insert();

-- Trigger: update_cash_amount_income_trigger

-- DROP TRIGGER IF EXISTS update_cash_amount_income_trigger ON public.node;

CREATE OR REPLACE TRIGGER update_cash_amount_income_trigger
    AFTER INSERT
    ON public.node
    FOR EACH ROW
    WHEN (new.type = 2)
    EXECUTE FUNCTION public.update_cash_amount_on_income_insert();
    
    
    -- Table: public.profile

-- DROP TABLE IF EXISTS public.profile;

CREATE TABLE IF NOT EXISTS public.profile
(
    profile_id integer NOT NULL DEFAULT nextval('profile_profile_id_seq'::regclass),
    user_id integer NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    country character varying(100) COLLATE pg_catalog."default" NOT NULL,
    city character varying(100) COLLATE pg_catalog."default",
    dependents integer NOT NULL,
    marital_status boolean NOT NULL,
    risk_tolerance integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_login timestamp without time zone,
    CONSTRAINT profile_pkey PRIMARY KEY (profile_id),
    CONSTRAINT fk_user_id UNIQUE (user_id),
    CONSTRAINT profile_user_id_key UNIQUE (user_id),
    CONSTRAINT profile_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public."User" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT profile_risk_tolerance_check CHECK (risk_tolerance = ANY (ARRAY[0, 1, 2]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profile
    OWNER to postgres;
