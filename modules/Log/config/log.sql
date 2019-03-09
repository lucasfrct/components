#Log.php

#DROP DATABASE IF EXISTS modules;
CREATE DATABASE IF NOT EXISTS modules;

/* TABLE REGISTERS ***********************************************************/
DROP TABLE IF EXISTS log;
CREATE TABLE IF NOT EXISTS log (
	`id`        INT ( 11 )      NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`idUser`    VARCHAR ( 255 ),
	`user`      VARCHAR ( 255 ),
	`comment`    TEXT			NOT NULL,
	`date`      DATETIME 		NOT NULL
) ENGINE = MyISAM;

/* **************************************************************************** */

/* INSERT TABLE REGISTERS ***************************************************** */
INSERT INTO log ( `idUser`, `user`, `comment`, `date` ) 
VALUES ( '1', 'root', 'TESTE LOG AUTO CREATE',  SYSDATE( )  );
/* ***************************************************************************** */