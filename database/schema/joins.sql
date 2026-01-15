 select *
            from rms.students s
            join rms.users u
            on s.user_id = u.id
            join rms.class c
            on s.class_id = c.class_id


 SELECT
                d.department_id,
                d.name,
                COUNT(DISTINCT c.class_id) AS total_classes,
                COUNT(s.student_id) AS total_students
                FROM rms.department d
                JOIN rms.class c
                ON d.department_id = c.department_id
                JOIN rms.students s
                ON c.class_id = s.class_id
                GROUP BY
                d.department_id,
                d.name
                ORDER BY
                d.department_id;