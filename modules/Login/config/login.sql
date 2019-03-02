/*
* Sigin.php / Login.php
*/

#DROP DATABASE IF EXISTS modules;
CREATE DATABASE IF NOT EXISTS modules;

/* TABLE REGISTERS ***********************************************************/
DROP TABLE IF EXISTS registers;
CREATE TABLE IF NOT EXISTS registers (
	`id`        INT ( 11 )      NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`user`      VARCHAR ( 255 ) NOT NULL,
	`email`     VARCHAR ( 255 ) NOT NULL,
	`password`  VARCHAR ( 255 ) NOT NULL,
	`date`		DATETIME 		NOT NULL,
	`country`   VARCHAR ( 255 ),
	`ddd`       VARCHAR ( 255 ),
	`telephone` VARCHAR ( 255 ),
	`recover` 	VARCHAR ( 255 ),
	`expire`	DATETIME
) ENGINE = MyISAM;

CREATE INDEX email     ON registers ( email ( 4 ), telephone ( 4 ) );
CREATE INDEX telephone ON registers ( telephone ( 4 ) );
CREATE INDEX password  ON registers ( password ( 4 ) );
/* **************************************************************************** */

/* TABLE USERS **************************************************************** */
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users ( 
	`id`        INT ( 11 )      NOT NULL,
	`user`      VARCHAR ( 255 ) NOT NULL,
	`firstName` VARCHAR ( 255 ),
	`nickName`  VARCHAR ( 255 ),
	`lastName`  VARCHAR ( 255 )
) ENGINE = MyISAM;
/* *************************************************************************** */


/* TRIGGER INSERT REGISTERS ************************************************** */
DELIMITER //
CREATE TRIGGER tgrs_insert_registers AFTER INSERT 
ON registers 
FOR EACH ROW
BEGIN
	INSERT INTO users ( `id`, `user` ) 
	VALUES ( NEW.id, NEW.user );
END //
DELIMITER ;
/* **************************************************************************** */

/* INSERT TABLE REGISTERS ***************************************************** */
INSERT INTO registers ( `user`, `email`, `country`, `ddd`, `telephone`, `password`, `date` ) 
VALUES ( 'root', 'root@root.com', '+000', '00', '000000000', 'root1234', SYSDATE() );

INSERT INTO registers ( `user`, `email`, `country`, `ddd`, `telephone`, `password`, `date` ) 
VALUES ( 'admin', 'admin@admin.com', '+111', '11', '111111111', 'admin1234', SYSDATE( ) );

INSERT INTO registers ( `user`, `email`, `country`, `ddd`, `telephone`, `password`, `date` ) 
VALUES ( 'user', 'user@user.com', '222', '22', '222222222222', 'user1234', SYSDATE( ) );

INSERT INTO registers ( `user`, `email`, `country`, `ddd`, `telephone`, `password`, `date` ) 
VALUES ( 'guest', 'guest@guest.com', '+333', '33', '333333333333', 'guest1234', SYSDATE( ) );
/* ***************************************************************************** */