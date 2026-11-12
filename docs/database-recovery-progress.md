# GlobalHire Database Recovery Progress

Date: November 12, 2026

## Recovery Summary

Recovered all five GlobalHire database tables in an isolated MariaDB recovery environment.

### Recovered Tables

| Table | Recovered Records |
|---|---:|
| users | 3 |
| jobs | 7 |
| candidate_profiles | 2 |
| candidate_skills | 12 |
| job_skills | 23 |
| **Total** | **47** |

## Completed Work

- Recovered all five tables from their original InnoDB tablespace files.
- Verified recovered records in the isolated recovery environment.
- Recreated unique indexes.
- Exported SQL backups for all five tables.
- Created a separate database for SQL import validation.
- Successfully imported and verified users, jobs, and candidate_profiles.
- Converted UTF-16LE SQL exports into UTF-8 copies where necessary.
- Preserved the original database and its safety backups.

## Remaining Work

- Verify candidate_skills import.
- Import and verify job_skills.
- Recreate and test foreign key constraints.
- Verify all five tables together.
- Plan safe restoration to the original database.
- Test Node.js backend and Python matching service.
- Run project tests.

## Safety Notes

Recovery and validation were performed using isolated database environments. The original MariaDB database was preserved during recovery work.

This document records progress; it does not claim that the original database has been fully restored.
