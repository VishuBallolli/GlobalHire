-- 1. Skills required for each job
CREATE TABLE IF NOT EXISTS job_skills (
    id INT(11) NOT NULL AUTO_INCREMENT,
    job_id INT(11) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY uq_job_skill (job_id, skill_name),

    CONSTRAINT fk_job_skills_job
        FOREIGN KEY (job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- 2. Candidate profiles linked to registered users
CREATE TABLE IF NOT EXISTS candidate_profiles (
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_candidate_profiles_user (user_id),

    CONSTRAINT fk_candidate_profiles_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- 3. Skills belonging to each candidate
CREATE TABLE IF NOT EXISTS candidate_skills (
    id INT(11) NOT NULL AUTO_INCREMENT,
    candidate_profile_id INT(11) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY uq_candidate_skill (
        candidate_profile_id,
        skill_name
    ),

    CONSTRAINT fk_candidate_skills_profile
        FOREIGN KEY (candidate_profile_id)
        REFERENCES candidate_profiles(id)
        ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;