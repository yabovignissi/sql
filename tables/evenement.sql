CREATE TABLE IF NOT EXISTS `monstermon`.`Evenement` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(45) NOT NULL,
  `Date de debut` DATE NOT NULL,
  `Date de Fin` DATE NOT NULL,
  `Prix` INT(11) NOT NULL,
  `Arene` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `Date de debut`, `Date de Fin`),
  INDEX `arene_idx` (`Arene` ASC) VISIBLE,
  CONSTRAINT `ID_arene`
    FOREIGN KEY (`Arene`)
    REFERENCES `monstermon`.`Arene` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)