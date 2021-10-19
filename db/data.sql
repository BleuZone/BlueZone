INSERT INTO users
VALUES (0, 'email1_gmail.com', 'password1');

INSERT INTO username_matching
VALUES (0, 'person1', 22);

INSERT INTO posts
VALUES (0, 'Sample Post 1', 'body for sample post 1', 21, 0, '2021-10-17 00:00:00', 20, 'person1');

INSERT INTO pages
VALUES (0, 'Group Page 1', True, 0);

INSERT INTO comments
VALUES (0, 'person1', 'This is a great post!', null, 0,1, '2021-10-17 00:00:00');

INSERT INTO users
VALUES (1, 'email2_gmail.com', 'password2');

INSERT INTO username_matching
VALUES (1, 'person2', 23);

INSERT INTO posts
VALUES (1, 'Sample Post 2', 'body for sample post 2', 22, 2, 
'2021-10-17 02:20:20',0, 'person2');

INSERT INTO pages
VALUES (1, 'Group Page 2', True, 1);

INSERT INTO comments
VALUES (1, 'person2', 'This is a great post 2!', null, 0, 2, '2021-10-17 02:02:02');

INSERT INTO users
VALUES (2, 'email3_gmail.com', 'password3');

INSERT INTO username_matching
VALUES (2, 'person3', 33);

INSERT INTO posts
VALUES (2, 'Sample Post 3', 'body for sample post 3', 23, 3, '2021-10-12 03:23:20',0, 'person3');

INSERT INTO pages
VALUES (2, 'Group Page 3', True, 3);

INSERT INTO comments
VALUES (2, 'person3', 'This is a great post 3!', null, 2, 3, '2021-10-17 03:03:03');

INSERT INTO users
VALUES (3, 'email4_gmail.com', 'password4');

INSERT INTO username_matching
VALUES (3, 'person4', 43);

INSERT INTO posts
VALUES (3, 'Sample Post 4', 'body for sample post 4', 24, 3, '2021-10-17 03:03:03',0, 'person4');

INSERT INTO pages
VALUES (3, 'Group Page 4', True, 4);

INSERT INTO comments
VALUES (3, 'person4', 'This is a great post 4!', null, 4, 2, '2021-10-17 03:04:03');
