 select *
            from rms.students s
            join rms.users u
            on s.user_id = u.id
            join rms.class c
            on s.class_id = c.class_id