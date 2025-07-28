import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface InfoCardProps {
  image?: string;
  title: string;
  subtitle: string;
  amount?: string;
  key:string;
}

const InfoCard: React.FC<InfoCardProps> = ({ image, title, subtitle, amount }) => (
  <View style={styles.infoCard}>
    {image && (
      <Image source={{ uri: image }} style={styles.infoCardImage} />
    )}
    <View style={styles.infoCardTextContainer}>
      <Text style={styles.infoCardTitle}>{title}</Text>
      <Text style={styles.infoCardSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 12,
    width: 180,
    minHeight: 110,
    overflow: 'hidden',
    display: 'flex',
  },
  infoCardImage: {
    width: '100%',
    height: 70,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#e2e8f0',
  },
  infoCardTextContainer: {
    padding: 12,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 6,
  },
  infoCardSubtitle: {
    fontSize: 13,
    color: '#475569',
  },
  infoCardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
});

export default InfoCard;
