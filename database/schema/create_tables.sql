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