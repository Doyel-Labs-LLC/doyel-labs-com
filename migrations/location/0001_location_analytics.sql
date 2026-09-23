CREATE TABLE location_hourly (
  bucket_hour INTEGER NOT NULL CHECK (bucket_hour >= 0 AND bucket_hour % 3600 = 0),
  country TEXT NOT NULL CHECK (length(country) BETWEEN 1 AND 2),
  region TEXT NOT NULL CHECK (length(region) BETWEEN 1 AND 100),
  city TEXT NOT NULL CHECK (length(city) BETWEEN 1 AND 100),
  page_views INTEGER NOT NULL CHECK (page_views BETWEEN 1 AND 5000),
  PRIMARY KEY (bucket_hour, country, region, city)
) WITHOUT ROWID;

CREATE TABLE location_daily_budget (
  day_start INTEGER PRIMARY KEY CHECK (day_start >= 0 AND day_start % 86400 = 0),
  accepted INTEGER NOT NULL CHECK (accepted BETWEEN 0 AND 5000)
);

CREATE TABLE location_metadata (
  singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
  first_hour INTEGER NOT NULL CHECK (first_hour >= 0 AND first_hour % 3600 = 0)
);

-- BEFORE INSERT also runs on an UPSERT conflict. Admission and the counter
-- update are one atomic statement; any failure rolls back its trigger writes.
CREATE TRIGGER location_admit BEFORE INSERT ON location_hourly
BEGIN
  INSERT INTO location_daily_budget (day_start, accepted)
    VALUES (NEW.bucket_hour - NEW.bucket_hour % 86400, 0)
    ON CONFLICT (day_start) DO NOTHING;
  UPDATE location_daily_budget SET accepted = accepted + 1
    WHERE day_start = NEW.bucket_hour - NEW.bucket_hour % 86400 AND accepted < 5000;
  SELECT RAISE(IGNORE) WHERE changes() = 0;
  INSERT INTO location_metadata (singleton, first_hour) VALUES (1, NEW.bucket_hour)
    ON CONFLICT (singleton) DO NOTHING;
END;
