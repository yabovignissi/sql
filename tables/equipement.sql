CREATE TABLE IF NOT EXISTS `monstermon`.`Equipement` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(45),
  `ID Arene` INT(11),
  `Type` VARCHAR(45) ,
  PRIMARY KEY (`id`),
  INDEX `arene_idx` (`ID Arene` ASC) VISIBLE,
  CONSTRAINT `arene`
    FOREIGN KEY (`ID Arene`)
    REFERENCES `monstermon`.`Arene` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

