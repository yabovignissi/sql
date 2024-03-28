CREATE TABLE IF NOT EXISTS `monstermon`.`Quete` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom de la Quête` VARCHAR(45) ,
  `Localisation` VARCHAR(145) ,
  `Début` DATE ,
  `Fin` DATE ,
  `Point expérience gagné` INT(11) ,
  PRIMARY KEY (`id`))
