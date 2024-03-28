CREATE TABLE IF NOT EXISTS `monstermon`.`Arene` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(145) NOT NULL ,
  `Localisation` VARCHAR(145) ,
  `Nombre de place` INT(11) ,
  `Taille (en m2)` INT(11) ,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
