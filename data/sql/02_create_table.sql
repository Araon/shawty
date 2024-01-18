CREATE TABLE urls (
  code VARCHAR(10) PRIMARY KEY,
  longUrl VARCHAR(255) NOT NULL,
  isActive BOOLEAN NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- when the shortUrl is created
  expire TIMESTAMP DEFAULT NULL, -- when the shortUrl will expire if not null
  clicks INT -- how many times the shortUrl is clicked
);

CREATE INDEX idx_code ON urls (code); -- index on the code as it will sorted and then we can use binany search on it instead of linear search on it
