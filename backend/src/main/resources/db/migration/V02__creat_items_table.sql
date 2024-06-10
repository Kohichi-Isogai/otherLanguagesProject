CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item text,
    image_url text,
    quantity integer,
    limit_date date,
    user_id integer REFERENCES users (id)
)