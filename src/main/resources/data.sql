INSERT INTO customer (name, city) VALUES ('Marco', 'Wolfen');
INSERT INTO customer (name, city) VALUES ('Dennis', 'Büttel');
INSERT INTO customer (name, city) VALUES ('Nils', 'Braunschweig');

-- INSERT INTO app_user (name, consultantid, externalid) VALUES ('Loxa7881', 1, 'cnc_group_04@hgroennigeroutlook.onmicrosoft.com');
INSERT INTO app_user (name, consultantid, externalid) VALUES ('Vabu4227', 2, 'testuser_04@hgroennigeroutlook.onmicrosoft.com');
INSERT INTO app_user (name, consultantid, externalid) VALUES ('Muca3922', 3, 'testadmin04@hgroennigeroutlook.onmicrosoft.com');

INSERT INTO consultant (name) VALUES ('Loxa');
INSERT INTO consultant (name) VALUES ('Vabu');
INSERT INTO consultant (name) VALUES ('Muca');

INSERT INTO project (name, start_date, end_date, status, customer_id) VALUES ('SEP', '2025-10-24 12:00:00', '2025-12-24 12:00:00', 'pending', 1);
INSERT INTO project (name, start_date, end_date, status, customer_id) VALUES ('VTDSE', '2025-08-24 15:00:00', '2025-10-24 12:00:00', 'ongoing', 1);
INSERT INTO project (name, start_date, end_date, status, customer_id) VALUES ('ICANT', '2025-05-24 12:00:00', '2025-07-24 12:00:00', 'finished', 3);

INSERT INTO entry (date, hours, project_id, consultant_id) VALUES (current_timestamp, 10, 1, 1);
INSERT INTO entry (date, hours, project_id, consultant_id) VALUES (current_timestamp, 20, 1, 2);
INSERT INTO entry (date, hours, project_id, consultant_id) VALUES (current_timestamp, 15, 2, 1);
INSERT INTO entry (date, hours, project_id, consultant_id) VALUES (current_timestamp, 5, 2, 2);

INSERT INTO project_consultant (project_id, consultant_id) VALUES (1, 1);
INSERT INTO project_consultant (project_id, consultant_id) VALUES (2, 1);
INSERT INTO project_consultant (project_id, consultant_id) VALUES (3, 1);
INSERT INTO project_consultant (project_id, consultant_id) VALUES (1, 2);
INSERT INTO project_consultant (project_id, consultant_id) VALUES (3, 2);

