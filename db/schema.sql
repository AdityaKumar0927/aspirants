CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  file_path text,
  file_type text,
  original_name text,
  url text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_fragments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id uuid REFERENCES user_uploads(id),
  text_content text,
  fragment_type text,
  order_index int,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id uuid REFERENCES user_uploads(id),
  question_text text,
  question_type text,
  options text[],
  correct_index int,
  answer_explanation text,
  created_at timestamp DEFAULT now()
);
