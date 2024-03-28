CREATE TABLE IF NOT EXISTS `monstermon`.`Dresseur` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `professeur_id` INT(11) ,
  `Nom` VARCHAR(45) NOT NULL,
  `Prenom` VARCHAR(100) NOT NULL,
  `Genre` VARCHAR(100) NOT NULL,
  `Est Professeur` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `professeur_fk`
    FOREIGN KEY (`professeur_id`)
    REFERENCES `monstermon`.`Dresseur` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
