insert into rms.department values  (1,'Electronics and Computer Engineering'),  
(2,'Architecture'), (3,'Applied Science'), 
(4,'Automobile and Mechanical Engineering'), 
(5,'Civil Engineering'), (6,'Industrial Engineering');


insert into rms.class
values(1,'BCT',4,2,1),
 (2,'BCT',3,2,1),
 (3,'BCT',3,1,1),
 (4,'BCT',2,1,1),
 (5,'BCT',1,1,1);

 insert into rms.subject 
values(1,'CT 653','Artificial Intelligence',1),
(2,'CT 652','Database Management System',1),
(3,'CT 654','Minor Project',1),
(4,'CT 655','Embedded System',1),
(5,'CT 656','Operating System',1),
(6,'CE 655','Engineering Economincs',5),
(7,'CT 651','Object Oriented Analysis and Design',1);

INSERT INTO rms.resource (file_id, title, type, uploaded_by, date_uploaded) VALUES
('RES001', 'Data Structure Notes', 'Document', 'Er. Sudip Rana', '2024-01-15'),
('RES002', 'Database Management System', 'Pdf', 'Er. Rajad Shakya', '2024-02-10'),
('RES003', 'Artificial Intelligence', 'Presentation', 'Dr. Bipun Man Pati', '2024-03-05');
