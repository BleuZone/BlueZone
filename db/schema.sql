CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  user_email varchar(255) NOT NULL,
  user_password varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE username_matching (
  id INT AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  points INT,
  FOREIGN KEY (id) REFERENCES users(id),
  PRIMARY KEY (username)
);

CREATE TABLE pages (
  page_id INT NOT NULL AUTO_INCREMENT,
  page_title varchar(255) NOT NULL,
  page_parent_id INT,
  post_count INT NOT NULL,
  page_description varchar(255),
  PRIMARY KEY (page_id)
);

CREATE TABLE posts (
  post_id INT NOT NULL AUTO_INCREMENT,
  post_title varchar(255) NOT NULL,
  post_body TEXT,
  points INT NOT NULL,
  page_id INT NOT NULL,
  creation_time TIMESTAMP NOT NULL,
  comment_count int NOT NULL,
  username varchar(255),
  FOREIGN KEY (username) REFERENCES username_matching(username) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE CASCADE,
  PRIMARY KEY (post_id)
);


CREATE TABLE comments (
  comment_id INT NOT NULL AUTO_INCREMENT,
  username varchar(255),
  comment TEXT NOT NULL,
  parent_id INT,
  post_id INT NOT NULL,
  creation_time TIMESTAMP NOT NULL,
  points INT NOT NULL,
  FOREIGN KEY (username) REFERENCES username_matching(username) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  PRIMARY KEY (comment_id)
);

CREATE TABLE reported (
  post_id INT NOT NULL,
  post_title varchar(255) NOT NULL,
  post_body TEXT,
  points INT NOT NULL,
  page_id INT NOT NULL,
  creation_time TIMESTAMP NOT NULL,
  comment_count int NOT NULL,
  username varchar(255),
  FOREIGN KEY (username) REFERENCES username_matching(username),
  FOREIGN KEY (page_id) REFERENCES pages(page_id),
  PRIMARY KEY (post_id)
);

CREATE TABLE saving (
  save_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT,
  comment_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,
  PRIMARY KEY (save_id)
);
