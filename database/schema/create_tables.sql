CREATE SCHEMA IF NOT EXISTS rms;

CREATE TABLE rms.roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE rms.users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role_id INT REFERENCES rms.roles(id),
    is_active BOOLEAN DEFAULT TRUE
);

insert into rms.users values (1,'Shishir Timilsina','imccer@gmail.com','1234',1,TRUE);
select *from rms.users

create table rms.students (
    student_id int primary key,
	user_id int,
	class_id int,
	campus_rollno varchar(12)
);

create table rms.teachers (
     teacher_id int primary key,
	 user_id int,
	 department_id int
);
create table rms.department (
   department_id int primary key,
   name varchar(100)
);
create table rms.class (
   class_id int primary key,
   name varchar(100),
   year int,
   semester int,
   department_id int, --foreign key (department_id) references rms.department(department_id),
   subject_id varchar(10) --foreign key (subject_id) references rms.subject(subject_id),  
);
create table rms.subject (
   subject_id int,
   subject_code varchar(10),
   name varchar(100),
   department_id int
);
create table rms.teachersubjectclass (
   teacher_id int,
   subject_id int,
   class_id int
);
create table rms.file (
  file_id int primary key,
  file_name varchar(100),
  file_size varchar(20),
  file_type varchar(20),
  uploaded_at time
);
create table rms.resource (
   resource_id int primary key,
   file_id int,
   uploaded_by varchar(100),
   description text,
   created_at date
);
create table rms.resourcetarget (
   target_id int primary key,
   target_type varchar(100),
   resource_id int
);

-- ============================================
-- ALTER TABLE STATEMENTS TO ADD FOREIGN KEYS
-- ============================================

-- Fix file table uploaded_at column type (drop and recreate with default)
ALTER TABLE rms.file
DROP COLUMN uploaded_at,
ADD COLUMN uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add file_path column to file table (from ER diagram)
ALTER TABLE rms.file
ADD COLUMN file_path TEXT;

-- Fix resource table uploaded_by column type (should be INT, not VARCHAR)
ALTER TABLE rms.resource
ALTER COLUMN uploaded_by TYPE INT USING uploaded_by::integer;

-- Remove subject_id from class table (not in ER diagram)
ALTER TABLE rms.class
DROP COLUMN subject_id;

-- ============================================
-- ADD PRIMARY KEYS FIRST (before foreign keys that reference them)
-- ============================================

-- Add primary key to subject table
ALTER TABLE rms.subject
ADD CONSTRAINT pk_subject PRIMARY KEY (subject_id);

-- Add primary key to teachersubjectclass table
ALTER TABLE rms.teachersubjectclass
ADD CONSTRAINT pk_teachersubjectclass PRIMARY KEY (teacher_id, subject_id, class_id);

-- ============================================
-- ADD FOREIGN KEY CONSTRAINTS
-- ============================================

-- students table foreign keys
ALTER TABLE rms.students
ADD CONSTRAINT fk_students_user 
FOREIGN KEY (user_id) REFERENCES rms.users(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_students_class 
FOREIGN KEY (class_id) REFERENCES rms.class(class_id) ON DELETE SET NULL;

-- teachers table foreign keys
ALTER TABLE rms.teachers
ADD CONSTRAINT fk_teachers_user 
FOREIGN KEY (user_id) REFERENCES rms.users(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_teachers_department 
FOREIGN KEY (department_id) REFERENCES rms.department(department_id) ON DELETE SET NULL;

-- class table foreign keys
ALTER TABLE rms.class
ADD CONSTRAINT fk_class_department 
FOREIGN KEY (department_id) REFERENCES rms.department(department_id) ON DELETE SET NULL;

-- subject table foreign keys
ALTER TABLE rms.subject
ADD CONSTRAINT fk_subject_department 
FOREIGN KEY (department_id) REFERENCES rms.department(department_id) ON DELETE SET NULL;

-- teachersubjectclass table foreign keys
ALTER TABLE rms.teachersubjectclass
ADD CONSTRAINT fk_tsc_teacher 
FOREIGN KEY (teacher_id) REFERENCES rms.teachers(teacher_id) ON DELETE CASCADE,
ADD CONSTRAINT fk_tsc_subject 
FOREIGN KEY (subject_id) REFERENCES rms.subject(subject_id) ON DELETE CASCADE,
ADD CONSTRAINT fk_tsc_class 
FOREIGN KEY (class_id) REFERENCES rms.class(class_id) ON DELETE CASCADE;

-- resource table foreign keys
ALTER TABLE rms.resource
ADD CONSTRAINT fk_resource_file 
FOREIGN KEY (file_id) REFERENCES rms.file(file_id) ON DELETE CASCADE,
ADD CONSTRAINT fk_resource_uploader 
FOREIGN KEY (uploaded_by) REFERENCES rms.users(id) ON DELETE SET NULL;

-- resourcetarget table foreign keys
ALTER TABLE rms.resourcetarget
ADD CONSTRAINT fk_resourcetarget_resource 
FOREIGN KEY (resource_id) REFERENCES rms.resource(resource_id) ON DELETE CASCADE;

-- ============================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================

CREATE INDEX idx_students_user ON rms.students(user_id);
CREATE INDEX idx_students_class ON rms.students(class_id);
CREATE INDEX idx_teachers_user ON rms.teachers(user_id);
CREATE INDEX idx_teachers_dept ON rms.teachers(department_id);
CREATE INDEX idx_class_dept ON rms.class(department_id);
CREATE INDEX idx_subject_dept ON rms.subject(department_id);
CREATE INDEX idx_tsc_teacher ON rms.teachersubjectclass(teacher_id);
CREATE INDEX idx_tsc_subject ON rms.teachersubjectclass(subject_id);
CREATE INDEX idx_tsc_class ON rms.teachersubjectclass(class_id);
CREATE INDEX idx_resource_file ON rms.resource(file_id);
CREATE INDEX idx_resource_uploader ON rms.resource(uploaded_by);
CREATE INDEX idx_resourcetarget_resource ON rms.resourcetarget(resource_id);

-- ============================================
-- VERIFICATION QUERY
-- ============================================

-- Run this to verify all foreign keys were created successfully
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    tc.constraint_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'rms'
ORDER BY tc.table_name, tc.constraint_name;