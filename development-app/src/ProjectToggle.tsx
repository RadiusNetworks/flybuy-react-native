import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {APP_TOKEN, APP_TOKEN_2, APP_AUTH_ID, APP_AUTH_ID_2} from './constants';
import {useAppState} from './AppState';

type Project = {
  label: string;
  authId: string;
  token: string;
};

const PROJECTS: Project[] = [
  {label: '1st Project', authId: APP_AUTH_ID, token: APP_TOKEN},
  {label: '2nd Project', authId: APP_AUTH_ID_2, token: APP_TOKEN_2},
];

type Props = {
  onSelectToken: (token: string) => void;
};

export function ProjectToggle({onSelectToken}: Props) {
  const {selectedToken} = useAppState();

  const projects = PROJECTS.filter(p => p.token.length > 0);
  if (projects.length < 2) return null;

  return (
    <View style={styles.container}>
      {projects.map(project => {
        const isSelected = selectedToken === project.token;
        return (
          <TouchableOpacity
            key={project.token}
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={() => onSelectToken(project.token)}
            activeOpacity={0.75}>
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {project.label}
            </Text>
            <Text style={[styles.authId, isSelected && styles.authIdSelected]}>
              AppAuthId: {project.authId}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#02174F',
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#888',
    marginBottom: 5,
  },
  labelSelected: {
    color: '#02174F',
  },
  authId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ccc',
  },
  authIdSelected: {
    color: '#841584',
  },
});
