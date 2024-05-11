-- Table: "User"

CREATE TABLE "User"
(
    user_id serial PRIMARY KEY,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(50) NOT NULL,
    CONSTRAINT user_email_key UNIQUE (email)
);

-- Table: asset_holdings

CREATE TABLE asset_holdings
(
    holding_id serial PRIMARY KEY,
    user_id integer NOT NULL UNIQUE,
    cash_amount numeric(15,2) DEFAULT 0,
    assets_value numeric(15,2) DEFAULT 0,
    savings_balance numeric(15,2) DEFAULT 0,
    currency character varying(3),
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT asset_holdings_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES "User" (user_id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Table: node

CREATE TABLE node
(
    n_id serial PRIMARY KEY,
    user_id integer NOT NULL,
    type integer NOT NULL CHECK (type IN (0, 1, 2)),
    name character varying(255),
    amount numeric(15,2),
    currency character varying(3),
    category character varying(100),
    "interval" character varying(50),
    date date,
    notes text,
    deadline date CHECK (deadline > date OR deadline IS NULL),
    CONSTRAINT node_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES "User" (user_id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Table: profile

CREATE TABLE profile
(
    profile_id serial PRIMARY KEY,
    user_id integer NOT NULL UNIQUE,
    phone character varying(20) NOT NULL,
    country character varying(100) NOT NULL,
    city character varying(100),
    dependents integer NOT NULL,
    marital_status boolean NOT NULL,
    risk_tolerance integer NOT NULL CHECK (risk_tolerance IN (0, 1, 2)),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_login timestamp without time zone,
    CONSTRAINT profile_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES "User" (user_id) ON UPDATE NO ACTION ON DELETE NO ACTION
);