-- DROP EXISTING TABLES TO CLEAN SLATE
DROP TABLE IF EXISTS verification_codes CASCADE;
DROP TABLE IF EXISTS login_attempts CASCADE;
DROP TABLE IF EXISTS user_accounts CASCADE;
DROP TABLE IF EXISTS password_recovery CASCADE;
DROP TABLE IF EXISTS password_resets CASCADE;

-- LOGIN ATTEMPTS TABLE
CREATE TABLE login_attempts (
  id BIGSERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USER ACCOUNTS TABLE
CREATE TABLE user_accounts (
  id BIGSERIAL PRIMARY KEY,
  firstName TEXT,
  lastName TEXT,
  email TEXT,
  password TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PASSWORD RECOVERY TABLE
CREATE TABLE password_recovery (
  id BIGSERIAL PRIMARY KEY,
  recoveryInput TEXT,
  verificationCode TEXT,
  userAgent TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- VERIFICATION CODES TABLE
CREATE TABLE verification_codes (
  id BIGSERIAL PRIMARY KEY,
  verificationCode TEXT,
  code TEXT,
  recoveryTarget TEXT,
  userAgent TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PASSWORD RESETS TABLE
CREATE TABLE password_resets (
  id BIGSERIAL PRIMARY KEY,
  newPassword TEXT,
  userAgent TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR FASTER QUERIES
CREATE INDEX idx_login_timestamp ON login_attempts(timestamp DESC);
CREATE INDEX idx_user_email ON user_accounts(email);
CREATE INDEX idx_verification_code ON verification_codes(code);
CREATE INDEX idx_password_recovery_timestamp ON password_recovery(timestamp DESC);
CREATE INDEX idx_password_reset_timestamp ON password_resets(timestamp DESC);
