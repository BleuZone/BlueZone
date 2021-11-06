INSERT INTO users (user_email, user_password) VALUES ('bluezoneadmin@duke.edu', 'bluezonebestteam123');

INSERT INTO users (user_email, user_password) VALUES ('zsl6@duke.edu', 'HASHEDPASSWORD');

INSERT INTO username_matching (username, points, id) VALUES ('bluezoneadmin', 0, 1);

INSERT INTO username_matching (username, points, id) VALUES ('zlewitton', 0, 2);

INSERT INTO pages (page_title, page_parent_id, post_count) VALUES ('Home', null, 0);

INSERT INTO pages (page_title, page_parent_id, post_count) VALUES ('Majors', 1, 0);

INSERT INTO posts (post_title, post_body, points, page_id, creation_time, comment_count, username) VALUES ('My First Post!', 'I am so excited to be the first one to post of this wonderful website. If only others could be as lucky as me.', 0, 1, '2021-10-28 18:01:23',0, 'zlewitton');

INSERT INTO comments (username, comment, parent_id, post_id, creation_time, points) VALUES ('zlewitton', "Wow I'm the first comment on this post!", null, 1, '2021-10-28 18:03:28', 0);


-- YYYY-MM-DD HH:MM:SS