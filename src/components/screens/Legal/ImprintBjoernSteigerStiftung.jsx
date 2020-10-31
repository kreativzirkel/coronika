import React from 'react';
import { StyleSheet, Text } from 'react-native';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';

const ImprintBjoernSteigerStiftung = ({ colors, fontFamilyRegular, vw }) => {
  const styles = StyleSheet.create({
    text: {
      color: colors.TEXT,
      fontFamily: fontFamilyRegular,
      fontSize: vw(4),
      lineHeight: vw(6),
    },
  });

  return (
    <Text style={styles.text}>
      Angaben gemäß §5 TMG, §55 RStV{'\n'}
      {'\n'}
      Verantwortlich für den Inhalt dieser App:{'\n'}
      Björn Steiger Stiftung{'\n'}
      Petristraße 12{'\n'}
      71364 Winnenden{'\n'}
      {'\n'}
      Post- und Besucheradresse:{'\n'}
      Max-Eyth-Straße 7{'\n'}
      71364 Winnenden{'\n'}T +49 7195-30 55-0{'\n'}F +49 7195-30 55-999{'\n'}E info@steiger-stiftung.de{'\n'}H
      www.steiger-stiftung.de{'\n'}
      {'\n'}
      Steuernummer: 90080/18094{'\n'}
      zuständiges Finanzamt: 71328 Waiblingen{'\n'}
      {'\n'}
      Spendenkonto:{'\n'}
      Bernhauser Bank{'\n'}
      DE 51 6126 2345 0004 4440 00{'\n'}
      GENODES1BBF{'\n'}
      {'\n'}
      Bußgeldkonto:{'\n'}
      Volksbank Stuttgart{'\n'}
      DE 46 6009 0100 0500 0200 00{'\n'}
      VOBADESS{'\n'}
      {'\n'}
      Präsidialrat:{'\n'}
      Prof. Dr. Jürgen Gramke (Vorsitzender), Liz Mohn und Dr. Rüdiger Grube (stellvertretende Vorsitzende), Prof. Kurt
      Bodewig, Sigmar Gabriel, Günther Oettinger, Prof. Klaus-Dieter Scheurle{'\n'}
      {'\n'}
      Präsident:{'\n'}
      Pierre-Enric Steiger{'\n'}
      {'\n'}
      Mitglieder des Vorstands:{'\n'}
      Pierre-Enric Steiger, Dr. med. h.c. Siegfried Steiger{'\n'}
      {'\n'}
      Geschäftsführung:{'\n'}
      Sabrina Seitter, Marcel Schneider{'\n'}
      {'\n'}
      Zuständige Aufsichtsbehörde:{'\n'}
      Regierungspräsidium Stuttgart{'\n'}
      Ruppmannstr. 21{'\n'}
      70565 Stuttgart{'\n'}
      {'\n'}
      Inhaltlich verantwortlich:{'\n'}
      Pierre-Enric Steiger{'\n'}
      {'\n'}
      Haftungsausschluss:{'\n'}
      Bei der Zusammenstellung der Inhalte und Informationen auf diesem Internet-Auftritt haben wir uns um größtmögliche
      Sorgfalt bemüht. Gleichwohl kann die Björn Steiger Stiftung keinerlei Haftung, aus welchem Rechtsgrund auch immer,
      für die Richtigkeit, Aktualität und Vollständigkeit dieses Internet-Auftritts und für die Inhalte externer Links
      übernehmen. Die Björn Steiger Stiftung behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot
      ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder
      endgültig einzustellen.{'\n'}
      {'\n'}
      Externe Verweise und Links:{'\n'}
      Die Björn Steiger Stiftung hat auf ihren Seiten Links zu Seiten und Online-Shops im Internet gelegt, deren Inhalt
      und Aktualisierung nicht in ihrem Einflussbereich liegen. Für Inhalte und insbesondere für Schäden, die aus der
      Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter dieser
      Seiten.{'\n'}
      {'\n'}
      Copyright:{'\n'}
      Die Björn Steiger Stiftung ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Texte,
      Tondokumente, Animationen und Videos/Videosequenzen zu beachten. Alle innerhalb des Internet-Auftritts genannten
      und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des
      jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Das Copyright
      für veröffentlichte, von der Björn Steiger Stiftung selbst erstellte Texte, Bilder und sonstigen Objekte bleiben
      allein bei der Björn Steiger Stiftung. Eine Vervielfältigung oder Verwendung solcher Texte, Grafiken,
      Tondokumente, Animationen und Videos/Videosequenzen in anderen elektronischen oder gedruckten Publikationen ist
      ohne ausdrückliche Zustimmung der Björn Steiger Stiftung nicht gestattet.
    </Text>
  );
};

export default withColorScheme(withI18n(withViewportUnits(ImprintBjoernSteigerStiftung)));
