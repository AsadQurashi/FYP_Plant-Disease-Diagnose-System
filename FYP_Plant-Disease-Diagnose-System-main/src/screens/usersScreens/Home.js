import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const categories = [
  { id: "flowers", name: "🌸 Flowers" },
  { id: "fruits", name: "🍎 Fruits" },
  { id: "vegetables", name: "🥦 Vegetables" },
  { id: "herbs", name: "🌿 Herbs" },
  { id: "succulents", name: "🪴 Succulents" },
  { id: "indoor_plants", name: "🏠 Indoor Plants" },
  { id: "cacti", name: "🌵 Cacti" },
];

const plantsByCategory = {
  flowers: [
    {
      id: 1,
      name: "Rose",
      description: "Classic flower",
      imageUrl: require("../../../assets/images/Rose.png"),
      toxicityToHumans: "Mildly toxic",
      toxicityToPets: "Mildly toxic",
      weedPotential: "Low",
      distribution: "Global",
      characteristics: {
        matured: {
          height: "1.2 m",
          spread: "1 m",
          leafColor: ["#228B22", "#006400"],
          leafType: "Deciduous",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#FF0000", "#FFC0CB"],
          bloomingSeason: "Spring to Fall",
          fragrance: "Strong",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
  ],
  fruits: [
    {
      id: 3,
      name: "Apple Tree",
      description: "Produces apples",
      imageUrl: require("../../../assets/images/AppleTree.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Non-toxic",
      weedPotential: "Low",
      distribution: "Temperate regions",
      characteristics: {
        matured: {
          height: "6 m to 25 m",
          spread: "8 m",
          leafColor: ["#00BFA5", "#F44336", "#FF9800"],
          leafType: "Deciduous",
          plantingTime: "Spring, Autumn",
        },
        flower: {
          color: ["#FFFFFF", "#F8BBD0"],
          bloomingSeason: "Spring",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: true,
        },
      },
    },
  ],
  vegetables: [
    {
      id: 5,
      name: "Tomato",
      description: "Popular fruit vegetable",
      imageUrl: require("../../../assets/images/Tomato.png"),
      toxicityToHumans: "Leaves are toxic",
      toxicityToPets: "Mildly toxic",
      weedPotential: "Moderate",
      distribution: "Worldwide",
      characteristics: {
        matured: {
          height: "1.5 m",
          spread: "60 cm",
          leafColor: ["#228B22"],
          leafType: "Deciduous",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#FFFF00"],
          bloomingSeason: "Late Spring",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: true,
        },
      },
    },
    {
      id: 6,
      name: "Carrot",
      description: "Root vegetable",
      imageUrl: require("../../../assets/images/carrot.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Non-toxic",
      weedPotential: "Low",
      distribution: "Temperate zones",
      characteristics: {
        matured: {
          height: "30 cm",
          spread: "10 cm",
          leafColor: ["#228B22"],
          leafType: "Deciduous",
          plantingTime: "Spring, Fall",
        },
        flower: {
          color: ["#FFFFFF"],
          bloomingSeason: "Summer (biennial)",
          fragrance: "None",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
  ],
  herbs: [
    {
      id: 7,
      name: "Basil",
      description: "Aromatic herb",
      imageUrl: require("../../../assets/images/basil.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Non-toxic",
      weedPotential: "Low",
      distribution: "Tropical regions",
      characteristics: {
        matured: {
          height: "50 cm",
          spread: "30 cm",
          leafColor: ["#2E8B57"],
          leafType: "Herbaceous",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#FFFFFF", "#Purple"],
          bloomingSeason: "Summer",
          fragrance: "Strong",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
    {
      id: 8,
      name: "Mint",
      description: "Cooling herb",
      imageUrl: require("../../../assets/images/Rose.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Mildly toxic to cats and dogs",
      weedPotential: "High",
      distribution: "Global",
      characteristics: {
        matured: {
          height: "45 cm",
          spread: "90 cm",
          leafColor: ["#3CB371"],
          leafType: "Herbaceous",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#Purple", "#White"],
          bloomingSeason: "Summer",
          fragrance: "Minty",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
  ],
  succulents: [
    {
      id: 9,
      name: "Aloe Vera",
      description: "Medicinal succulent",
      imageUrl: require("../../../assets/images/Rose.png"),
      toxicityToHumans: "Mildly toxic (latex)",
      toxicityToPets: "Toxic",
      weedPotential: "Low",
      distribution: "Africa, Asia",
      characteristics: {
        matured: {
          height: "60 cm",
          spread: "50 cm",
          leafColor: ["#228B22", "#A2D149"],
          leafType: "Succulent",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#Yellow", "#Orange"],
          bloomingSeason: "Summer",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
    {
      id: 10,
      name: "Echeveria",
      description: "Rosette-forming succulent",
      imageUrl: require("../../../assets/images/Rose.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Non-toxic",
      weedPotential: "Low",
      distribution: "Mexico, Central America",
      characteristics: {
        matured: {
          height: "15 cm",
          spread: "20 cm",
          leafColor: ["#90EE90", "#8FBC8F"],
          leafType: "Succulent",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#Pink", "#Orange"],
          bloomingSeason: "Summer",
          fragrance: "None",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
  ],
  indoor_plants: [
    {
      id: 11,
      name: "Snake Plant",
      description: "Air purifying plant",
      imageUrl: require("../../../assets/images/Rose.png"),
      toxicityToHumans: "Mildly toxic",
      toxicityToPets: "Toxic",
      weedPotential: "Low",
      distribution: "West Africa",
      characteristics: {
        matured: {
          height: "90 cm",
          spread: "30 cm",
          leafColor: ["#006400", "#9ACD32"],
          leafType: "Evergreen",
          plantingTime: "Year-round (indoors)",
        },
        flower: {
          color: ["#White", "#Greenish"],
          bloomingSeason: "Rare indoors",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
    {
      id: 12,
      name: "Peace Lily",
      description: "Elegant flowering houseplant",
      imageUrl: require("../../../assets/images/Rose.png"),
      toxicityToHumans: "Mildly toxic",
      toxicityToPets: "Toxic",
      weedPotential: "Low",
      distribution: "Tropical Americas",
      characteristics: {
        matured: {
          height: "65 cm",
          spread: "50 cm",
          leafColor: ["#228B22"],
          leafType: "Evergreen",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#FFFFFF"],
          bloomingSeason: "Spring to Summer",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: false,
        },
      },
    },
  ],
  cacti: [
    {
      id: 13,
      name: "Saguaro",
      description: "Large iconic cactus",
      imageUrl: require("../../../assets/images/Rose.png"),
      toxicityToHumans: "Non-toxic",
      toxicityToPets: "Non-toxic",
      weedPotential: "Low",
      distribution: "Sonoran Desert",
      characteristics: {
        matured: {
          height: "12 m",
          spread: "3 m",
          leafColor: ["#006400"],
          leafType: "Spiny",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#White"],
          bloomingSeason: "Late Spring",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: true,
        },
      },
    },
    {
      id: 14,
      name: "Prickly Pear",
      description: "Cactus with edible fruit",
      imageUrl: require("../../../assets/images/Rose.png"),
      toxicityToHumans: "Non-toxic (if peeled)",
      toxicityToPets: "Mildly toxic",
      weedPotential: "High",
      distribution: "Americas, Mediterranean",
      characteristics: {
        matured: {
          height: "1.5 m",
          spread: "3 m",
          leafColor: ["#556B2F"],
          leafType: "Spiny",
          plantingTime: "Spring",
        },
        flower: {
          color: ["#Yellow", "#Red"],
          bloomingSeason: "Spring to Early Summer",
          fragrance: "Mild",
        },
        fruit: {
          hasFruit: true,
        },
      },
    },
  ],
};

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('matured');
  const [searchTerm, setSearchTerm] = useState('');

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPlantItem = ({ item }) => (
    <View style={styles.plantCard}>
      <Image source={item.imageUrl} style={styles.plantImage} resizeMode="cover" />
      <Text style={styles.plantName}>🌱 {item.name}</Text>
      <Text style={styles.plantDesc}>{item.description}</Text>

      <View style={styles.characteristicsContainer}>
        <Text style={styles.characteristicsTitle}>🧬 Characteristics</Text>
        <View style={styles.tabsContainer}>
          {['matured', 'flower', 'fruit'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTab,
                ]}
              >
                {tab === 'matured' ? '🌿 Matured' :
                 tab === 'flower' ? '🌼 Flower' :
                 '🍓 Fruit'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {Object.entries(item.characteristics[activeTab]).map(([key, value]) => (
          <View style={styles.characteristicsRow} key={key}>
            <Text style={styles.characteristicsLabel}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
            </Text>
            {Array.isArray(value) ? (
              <View style={styles.colorDotsContainer}>
                {value.map((color, i) => (
                  <View key={i} style={[styles.colorDot, { backgroundColor: color }]} />
                ))}
              </View>
            ) : (
              <Text style={styles.characteristicsValue}>
                {typeof value === 'boolean' ? (value ? 'Yes ✅' : 'No ❌') : value}
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search plants..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.headerText}>🌿 Welcome to Plantiverse</Text>
        <Text style={styles.subText}>Explore our curated plant collection below. 🌱</Text>
      </View>

      {!selectedCategory ? (
        <>
          <Text style={styles.sectionTitle}>📂 Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={renderCategoryItem}
            contentContainerStyle={styles.categoryGrid}
            scrollEnabled={false}
          />
        </>
      ) : (
        <>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text style={styles.backButton}>🔙 Back to Categories</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>🪴 Plants in {selectedCategory.replace(/_/g, ' ')}</Text>
          <FlatList
            data={plantsByCategory[selectedCategory]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPlantItem}
            contentContainerStyle={styles.plantList}
            scrollEnabled={false}
          />
        </>
      )}
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { paddingBottom: 20, backgroundColor: '#E6F9F4' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000', // Ensures typed text is visible
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 30,
    color: '#0B5D51',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B5D51',
    textAlign: 'center',
  },
  subText: { fontSize: 17, color: '#555', textAlign: 'center', paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
    color: '#0B5D51',
  },
  categoryGrid: { paddingHorizontal: 10, paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    width: '48%',
    alignItems: 'center',
    padding: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B5D51',
    textAlign: 'center',
    marginTop: 8,
  },
  backButtonContainer: { marginLeft: 20, marginBottom: 10 },
  backButton: { fontSize: 16, color: '#0B5D51' },
  plantList: { paddingHorizontal: 20 },
  plantCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 22,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  plantName: { fontSize: 20, fontWeight: 'bold', color: '#0B5D51' },
  plantDesc: { fontSize: 14, color: '#666', marginBottom: 6 },
  plantImage: {
    width: '100%',
    height: 200,
    borderRadius: 14,
    marginBottom: 10,
  },
  characteristicsContainer: {
    backgroundColor: '#F0F8F7',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  characteristicsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    paddingBottom: 4,
  },
  activeTab: {
    color: '#00A86B',
    borderBottomWidth: 2,
    borderColor: '#00A86B',
  },
  characteristicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  characteristicsLabel: { fontSize: 14, color: '#777' },
  characteristicsValue: { fontSize: 14, fontWeight: '600', color: '#000' },
  colorDotsContainer: { flexDirection: 'row', marginLeft: 5 },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});