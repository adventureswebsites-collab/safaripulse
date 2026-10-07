import { Adventure, Review } from '../types';

import maraImg from '../assets/images/hero_maasai_mara_safari_1791338270407.jpg';
import mtKenyaImg from '../assets/images/adventure_mount_kenya_trek_1791338280631.jpg';
import dianiImg from '../assets/images/adventure_diani_beach_dhow_1791338289643.jpg';
import naivashaImg from '../assets/images/adventure_lake_naivasha_camp_1791338298532.jpg';
import hellsGateImg from '../assets/images/adventure_hells_gate_gorge_1791338309201.jpg';

export const ORGANIZERS = {
  riftNomads: {
    id: 'org-rift-nomads',
    name: 'Rift Valley Bushcraft & Nomads',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    rating: 4.86,
    tripsCount: 94,
    verified: true,
    licenseNumber: 'TRA/LIC/2023/1842 · EcoTourism Kenya',
    responseTime: '< 20 minutes',
    phone: '+254 711 445 290',
    email: 'trips@riftvalleynomads.ke',
    organizedCountThisYear: 48
  },
  maraTrails: {
    id: 'org-mara-trails',
    name: 'Mara Trails Overland Collective',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    rating: 4.95,
    tripsCount: 168,
    verified: true,
    licenseNumber: 'TRA/LIC/2024/0912 · KATO Bonded A-Class',
    responseTime: '< 15 minutes',
    phone: '+254 722 890 144',
    email: 'safaris@maratrails.co.ke',
    organizedCountThisYear: 62
  },
  highlandAlpine: {
    id: 'org-highland-alpine',
    name: 'Highland Alpine Kenya Expeditions',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    rating: 4.98,
    tripsCount: 224,
    verified: true,
    licenseNumber: 'TRA/LIC/2022/0451 · Mountain Club of Kenya',
    responseTime: '< 10 minutes',
    phone: '+254 733 901 822',
    email: 'climb@highlandalpine.ke',
    organizedCountThisYear: 78
  },
  swahiliDhow: {
    id: 'org-swahili-dhow',
    name: 'Swahili Dhow & Marine Adventures',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    rating: 4.91,
    tripsCount: 88,
    verified: true,
    licenseNumber: 'TRA/LIC/2024/3104 · KWS Marine Partner',
    responseTime: '< 30 minutes',
    phone: '+254 740 182 667',
    email: 'crew@swahilidhowsafaris.com',
    organizedCountThisYear: 36
  }
};

export const ADVENTURES: Adventure[] = [
  {
    id: 'adv-hellsgate-weekend-01',
    slug: 'hells-gate-canyon-cycling-geothermal',
    title: 'Hell’s Gate Gorge Cycling & Olkaria Geothermal Spa Soak',
    tagline: 'High-energy Saturday road trip cycling through basalt canyons beside zebras, scrambling Ol Njorowa gorge, and relaxing in natural hot springs.',
    destination: 'Hell’s Gate National Park (Naivasha)',
    region: 'Great Rift Valley',
    category: 'Day Hikes & Trails',
    difficulty: 'Moderate',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 4900,
    conservationLevy: 800,
    featuredImage: hellsGateImg,
    galleryImages: [hellsGateImg, naivashaImg],
    rating: 4.88,
    reviewsCount: 142,
    availableDates: ['2026-10-10', '2026-10-17', '2026-10-24', '2026-10-31'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '06:15 AM (Prompt)',
    registrationDeadline: 'Closes Thursday 8:00 PM',
    pickupHubs: ['Kencom House CBD (06:15 AM)', 'Sarit Centre Westlands (06:45 AM)'],
    totalSeats: 16,
    availableSeats: 3,
    bookedSeatsCount: 13,
    isGuaranteedDeparture: true,
    experienceVibe: 'Active Day Escape · Solo & Friends',
    meetingPoint: 'Kencom House Bus Stage / Sarit Westlands',
    organizer: ORGANIZERS.riftNomads,
    overview: 'Escape the city for a Saturday rush! Ride 21-speed mountain bikes down the dramatic red cliffs of Hell’s Gate directly past wild zebras, giraffes, and gazelles. Hike 2 hours through the towering sandstone slots and natural hot water streams of Ol Njorowa Gorge led by local Maasai guides, followed by an afternoon soak in Olkaria’s geothermal spa pool.',
    highlights: [
      'Cycling through open African savanna surrounded by volcanic towers',
      'Scrambling through the carved sandstone slots of Ol Njorowa Gorge',
      'Natural geothermal warm waterfall showers inside the canyon',
      'Relaxing swim in the largest natural geothermal spa pool in Africa',
      'Return to Nairobi by 7:30 PM same evening'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Hell’s Gate, Gorge Scramble, Hot Springs & Return',
        description: 'Depart Nairobi at 06:15 AM via the scenic Great Rift Valley escarpment. Arrive at Elsa Gate by 08:30 AM, pick geared mountain bikes and cycle 9km to the ranger post spotting wildlife. Trek through the hot springs canyon, enjoy lunch, soak in Olkaria Spa, and return to Nairobi by 7:30 PM.',
        meals: 'Trail Energy Lunch, Bottled Water, Snacks',
        accommodation: 'Same-day return to Nairobi',
        highlights: ['Wildlife cycling', 'Gorge slot trek', 'Geothermal pool relax']
      }
    ],
    included: [
      'Return overland tour bus transport from Nairobi CBD/Westlands',
      'Fitted multi-gear mountain bike hire and safety helmet',
      'Services of certified canyon climbing guide & escort rangers',
      'Packed energy trail lunch and bottled drinking water',
      'Vehicle escort support following the cyclists'
    ],
    notIncluded: [
      'KWS park entrance conservation fee (KSh 800 citizen/resident)',
      'Olkaria geothermal spa pool admission (optional KSh 1,000)'
    ],
    requirements: [
      'Sneakers or hiking shoes with good grip on wet rock',
      'Change of clothes (swimwear and towel for geothermal pool)',
      'Light daypack, sunglasses, and sun hat'
    ],
    cancellationPolicy: 'Full voucher credit or refund if cancelled 24 hours prior to departure.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-naivasha-camp-02',
    slug: 'lake-naivasha-crescent-island-wild-camp',
    title: 'Lake Naivasha Crescent Island Boat Safari & Lakeside Campout',
    tagline: '2-day weekend bushcraft camp: walk within arm’s reach of wild giraffes on Crescent Island, motorized boat cruise with fish eagles, and evening nyama choma campfire.',
    destination: 'Lake Naivasha & Crescent Island',
    region: 'Great Rift Valley',
    category: 'Overnight Bush Camps',
    difficulty: 'Easy',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 7800,
    conservationLevy: 1200,
    featuredImage: naivashaImg,
    galleryImages: [naivashaImg, hellsGateImg],
    rating: 4.92,
    reviewsCount: 118,
    availableDates: ['2026-10-10', '2026-10-17', '2026-10-24', '2026-10-31'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '07:00 AM',
    registrationDeadline: 'Closes Friday 12:00 PM',
    pickupHubs: ['National Museum Hill (07:00 AM)', 'Westlands Shell Petrol Station (07:20 AM)'],
    totalSeats: 14,
    availableSeats: 4,
    bookedSeatsCount: 10,
    isGuaranteedDeparture: true,
    experienceVibe: 'Campfire & Bushcraft · Social',
    meetingPoint: 'Nairobi National Museum Grounds, Museum Hill',
    organizer: ORGANIZERS.riftNomads,
    overview: 'The quintessential Kenyan weekend escape. Motorized speedboats skim across Lake Naivasha while African fish eagles dive for fish. Land on Crescent Island Game Sanctuary for a guided walking safari directly alongside giraffe herds, waterbucks, and wildebeests. Pitch camp under giant yellow fever trees on the lake shore and spend Saturday evening around a roaring acacia campfire with fresh nyama choma barbecue.',
    highlights: [
      'Walking safari beside roaming Maasai giraffes (no predators on island)',
      'Motorized boat expedition watching hunting fish eagles and hippo pods',
      'All camping equipment provided: waterproof canvas tents, mattresses, sleeping bags',
      'Saturday evening barbecue feast (nyama choma) with acoustic campfire music',
      'Sunday morning Crater Lake rim walk before returning to Nairobi'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Naivasha, Boat Cruise & Crescent Island Walk',
        description: 'Depart Nairobi 07:00 AM, arrive Naivasha by 09:30 AM. Board open safari boats for 1-hour cruise to Crescent Island. 2-hour walking safari among herds. Pitch camp at sanctuary grounds, swim, and enjoy barbecue bush dinner by the campfire.',
        meals: 'Picnic Lunch, Bush Barbecue Dinner',
        accommodation: 'Sanctuary Lakeview Canvas Tents & Sleeping Bags',
        highlights: ['Boat ride with hippos', 'Walking with giraffes', 'Campfire nyama choma']
      },
      {
        day: 2,
        title: 'Crater Lake Rim Walk & Return to Nairobi',
        description: 'Wake up to misty lake views and hot chai. Short excursion to Crater Lake volcanic emerald pool for panoramic rim hike before lunch and afternoon return drive to Nairobi by 5:00 PM.',
        meals: 'Cooked Breakfast, Lakeside Lunch',
        accommodation: 'Return to Nairobi drop-off points',
        highlights: ['Crater Lake panoramic view', 'Curio market stop']
      }
    ],
    included: [
      'Return overland cruiser transport from Nairobi',
      'Motorized Lake Naivasha boat expedition',
      'Crescent Island wildlife walking permit & guide',
      'Complete camping gear (waterproof tent, comfortable mattress, sleeping bag)',
      'All fresh meals prepared by camp chef including evening barbecue'
    ],
    notIncluded: [
      'Sanctuary conservation entry fee (KSh 1,200 citizen/resident)',
      'Personal drinks outside camp meal service'
    ],
    requirements: [
      'Warm hoodie or fleece jacket (Naivasha nights are cool)',
      'Comfortable walking shoes',
      'Flashlight or headlamp, mosquito repellant'
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours before trip.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-mara-overland-03',
    slug: 'maasai-mara-big-cats-weekend-overland',
    title: 'Maasai Mara 3-Day Big Cats & Savannah Overland Expedition',
    tagline: '3-day 4x4 Land Cruiser expedition tracking lion prides, cheetah coalitions, and elephant herds in the Mara Triangle with luxury tented camp.',
    destination: 'Maasai Mara National Reserve',
    region: 'Southwest Kenya',
    category: 'Weekend Road Trips',
    difficulty: 'Easy',
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 18500,
    conservationLevy: 3500,
    featuredImage: maraImg,
    galleryImages: [maraImg, mtKenyaImg],
    rating: 4.96,
    reviewsCount: 186,
    availableDates: ['2026-10-09', '2026-10-16', '2026-10-23', '2026-10-30'],
    nextDepartureDateText: 'This Friday, 09 Oct',
    departureTime: '06:00 AM (Sharp)',
    registrationDeadline: 'Closes Wednesday 9:00 PM (2 seats left!)',
    pickupHubs: ['Kencom House CBD (06:00 AM)', 'Sarit Centre Westlands (06:30 AM)'],
    totalSeats: 12,
    availableSeats: 2,
    bookedSeatsCount: 10,
    isGuaranteedDeparture: true,
    experienceVibe: 'Bucket-List Overland · Big 5',
    meetingPoint: 'Nairobi CBD (Kencom) or Westlands Sarit Centre',
    organizer: ORGANIZERS.maraTrails,
    overview: 'The ultimate African wildlife road trip. Ride in an outfitted 4x4 safari Land Cruiser with open pop-up roof and individual window seats. Led by a Silver-level KPSGA certified naturalist guide, you will track cheetah prides on the plains, witness lions hunting in the Mara Triangle, and spend nights in en-suite luxury safari tents beside the campfire.',
    highlights: [
      'Guaranteed 4x4 Land Cruiser with pop-up roof for 360° wildlife photography',
      'Sunset and dawn game drives in the wildlife-dense Mara Triangle',
      'Campfire bush dinners and Maasai naturalist storytelling',
      'Mara River banks exploration with basking hippos and giant crocs',
      'High-frequency VHF radio coordination for live predator sightings'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Mara Triangle via Great Rift Valley Viewpoint',
        description: 'Depart Nairobi early morning, stopping at the Rift Valley escarpment. Descend through Narok town into the Mara ecosystem by 1:00 PM for lunch. Introductory sunset game drive.',
        meals: 'Lunch, Dinner',
        accommodation: 'Enkorok Mara Tented Camp (En-suite tents & hot showers)',
        highlights: ['Rift Valley photo stop', 'Sunset lion tracking', 'Campfire welcome']
      },
      {
        day: 2,
        title: 'Full Day Predator Tracking & Savannah Picnic',
        description: '06:30 AM dawn safari for peak predator action. Spend full day exploring the Mara Triangle, picnic lunch under an acacia tree, and visit the Mara River banks.',
        meals: 'Camp Breakfast, Bush Picnic Lunch, Dinner',
        accommodation: 'Enkorok Mara Tented Camp',
        highlights: ['Dawn predator hunt', 'Mara River banks', 'Open plains picnic']
      },
      {
        day: 3,
        title: 'Sunrise Game Drive & Scenic Return to Nairobi',
        description: 'Final early morning game drive, hearty breakfast, and return scenic road trip to Nairobi arriving by 4:30 PM Sunday afternoon.',
        meals: 'Breakfast, Lunch en route',
        accommodation: 'Return drop-off at Nairobi pickup points',
        highlights: ['Golden hour photography', 'Narok curio market']
      }
    ],
    included: [
      'Transport in custom 4x4 Safari Land Cruiser with pop-up roof',
      '2 nights en-suite luxury tented camp accommodation',
      'All meals (breakfast, lunch, dinner) prepared fresh daily',
      'Certified KPSGA professional safari guide',
      'Daily comprehensive game drives as per itinerary',
      'Unlimited bottled mineral drinking water in vehicle'
    ],
    notIncluded: [
      'Park entry and conservancy fee (KSh 3,500 resident/citizen)',
      'Personal alcoholic beverages'
    ],
    requirements: [
      'National ID Card or Passport (mandatory for park entry)',
      'Neutral-toned safari clothing (khaki, olive, tan)',
      'Warm jacket for chilly morning and night game drives'
    ],
    cancellationPolicy: 'Free reschedule up to 48 hours prior. Full refund up to 7 days before departure.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-mtkenya-summit-04',
    slug: 'mount-kenya-point-lenana-summit-traverse',
    title: 'Mount Kenya Point Lenana (4,985m) Alpine Summit Traverse',
    tagline: '4-day high-altitude mountaineering expedition climbing Africa’s second highest mountain via the scenic Chogoria-Sirimon route.',
    destination: 'Mount Kenya National Park',
    region: 'Central Highlands',
    category: 'Alpine Summits',
    difficulty: 'Challenging',
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 16800,
    conservationLevy: 2800,
    featuredImage: mtKenyaImg,
    galleryImages: [mtKenyaImg, hellsGateImg],
    rating: 4.98,
    reviewsCount: 96,
    availableDates: ['2026-10-14', '2026-10-21', '2026-10-28', '2026-11-04'],
    nextDepartureDateText: 'Next Wednesday, 14 Oct',
    departureTime: '05:30 AM',
    registrationDeadline: 'Closes Monday 6:00 PM (3 spots left)',
    pickupHubs: ['Nairobi Railway Station (05:30 AM)', 'Thika Road Mall (06:00 AM)'],
    totalSeats: 10,
    availableSeats: 3,
    bookedSeatsCount: 7,
    isGuaranteedDeparture: true,
    experienceVibe: 'Mountain Summit · Endurance Squad',
    meetingPoint: 'Nairobi Central Railway Station',
    organizer: ORGANIZERS.highlandAlpine,
    overview: 'Conquer Africa’s second highest peak! Trek through indigenous bamboo rainforests, giant groundsel moorlands, and the surreal glaciated valleys beneath Batian and Nelion. Summit Point Lenana at 4,985m at sunrise for a view stretching hundreds of miles across equatorial Africa to Kilimanjaro.',
    highlights: [
      'Certified high-altitude mountain guides & wilderness first responders',
      'Daily pulse oximeter acclimation monitoring for mountain safety',
      'Sunrise on Point Lenana summit (4,985m) with panoramic views',
      'Dedicated porters, camp cook team, and fresh high-calorie mountain meals',
      'Traverse through the dramatic Gorges Valley and Lake Michaelson'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Sirimon Gate & Trek to Old Moses Camp (3,300m)',
        description: 'Transfer through Central Kenya pineapple fields to Sirimon Gate. Register with KWS and hike 3.5 hours through indigenous cedar forest to Old Moses mountain hut.',
        meals: 'Packed Lunch, Hot Dinner',
        accommodation: 'Old Moses Mountain Huts / Alpine Bunks',
        highlights: ['Forest elephant trails', 'First alpine peak views']
      },
      {
        day: 2,
        title: 'Old Moses to Shipton’s Camp via Mackinder’s Valley (4,200m)',
        description: 'Trek 6–7 hours across the surreal moorlands and streams into the amphitheater beneath the main twin rock spires.',
        meals: 'Breakfast, Trail Energy Lunch, Dinner',
        accommodation: 'Shipton’s Alpine Camp',
        highlights: ['Giant Lobelias', 'Sheer mountain rock faces']
      },
      {
        day: 3,
        title: 'Summit Push to Point Lenana (4,985m) & Descend Chogoria',
        description: '02:45 AM alpine push up scree slopes to reach the summit for sunrise over equatorial glaciers. Descend through Gorges Valley to Chogoria bandas.',
        meals: 'Pre-summit Tea, Summit Brunch, Dinner',
        accommodation: 'Chogoria Alpine Bandas',
        highlights: ['Sunrise on 4,985m summit', 'Lake Michaelson vista']
      },
      {
        day: 4,
        title: 'Descent through Chogoria Bamboo Forest to Nairobi',
        description: 'Walk 10km through bamboo groves to park gate where 4WD transport awaits to transfer back to Nairobi by late afternoon.',
        meals: 'Full Breakfast, Celebration Lunch in Embu',
        accommodation: 'Return to Nairobi drop-off',
        highlights: ['Vivienne Falls canyon', 'Successful summit certificate']
      }
    ],
    included: [
      'Round-trip transport Nairobi–Nanyuki–Chogoria–Nairobi',
      'Certified mountain guide, chef, and porter (carries up to 12kg personal pack)',
      'All mountain hut and camp lodging fees',
      'All high-energy fresh mountain meals and hot beverages',
      'Emergency mountain rescue coordination'
    ],
    notIncluded: [
      'KWS park entrance conservation fee (KSh 2,800 citizen/resident)',
      'Personal hiking gear (boots, sleeping bag rated to -5°C, thermals)'
    ],
    requirements: [
      'Waterproof broken-in hiking boots with good ankle support',
      'Four-season sleeping bag and thermal layers',
      'Headlamp with spare batteries, medical fitness for high altitude'
    ],
    cancellationPolicy: 'Full refund up to 10 days before departure.',
    isFeatured: true,
    isTrending: false,
    isPopular: true,
    isThisWeekend: false
  },
  {
    id: 'adv-diani-dhow-05',
    slug: 'diani-wasini-marine-dhow-weekend-escape',
    title: 'Diani Beach Wasini Island Marine Dhow Safari & Coral Snorkel',
    tagline: '2-day coastal road trip: sail an authentic wooden dhow, snorkel with wild dolphins in Kisite Marine Park, and feast on Swahili coconut crab on Wasini Island.',
    destination: 'Diani Beach & Wasini Island',
    region: 'South Coast (Kwale)',
    category: 'Coastal & Water',
    difficulty: 'Easy',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 11200,
    conservationLevy: 1500,
    featuredImage: dianiImg,
    galleryImages: [dianiImg, naivashaImg],
    rating: 4.90,
    reviewsCount: 84,
    availableDates: ['2026-10-17', '2026-10-24', '2026-10-31', '2026-11-07'],
    nextDepartureDateText: 'Next Saturday, 17 Oct',
    departureTime: '07:30 AM',
    registrationDeadline: 'Closes Thursday 6:00 PM',
    pickupHubs: ['Mombasa SGR Terminus (07:30 AM)', 'Diani Beach Road Junction (08:15 AM)'],
    totalSeats: 16,
    availableSeats: 6,
    bookedSeatsCount: 10,
    isGuaranteedDeparture: true,
    experienceVibe: 'Beach & Marine · Chill Road Trip',
    meetingPoint: 'Mombasa SGR Terminus / Diani Junction',
    organizer: ORGANIZERS.swahiliDhow,
    overview: 'Catch the Friday night or Saturday morning SGR train down to the coast! Board a handcrafted Arab-Swahili wooden dhow with billowing canvas sails. Cruise into Kisite Mpunguti Marine Park where wild dolphins play in turquoise channels. Snorkel over live coral reefs, eat fresh coconut crab on Wasini Island, and swim at a sandbar in the Indian Ocean.',
    highlights: [
      'Cruising aboard an authentic wooden sailing dhow with Swahili crew',
      'Snorkeling with wild dolphins, sea turtles, and stingrays in Kisite Park',
      'Four-course authentic Swahili seafood feast on Wasini Island',
      'Canoe paddle through the ancient baobabs of Kongo River estuary',
      'Boutique eco-cottage beachfront stay in Diani'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Mombasa/Diani to Shimoni Jetty & Kisite Marine Snorkeling',
        description: 'Morning transfer to historical Shimoni jetty. Board the traditional dhow with tea and mandazi. Sail out to Kisite Marine Park for 2.5 hours of guided snorkeling. Fresh crab lunch on Wasini Island.',
        meals: 'Swahili Lunch with Crab, Welcome Drinks',
        accommodation: 'Diani Beachfront Eco-Cottages',
        highlights: ['Wild dolphin watching', 'Coral reef snorkeling', 'Fresh seafood feast']
      },
      {
        day: 2,
        title: 'Kongo River Mangrove Paddle & Diani Sandbank Relaxation',
        description: 'Morning canoe paddle among baobabs at Kongo River estuary where river meets Indian ocean. Leisure on Diani Beach before drop-off at Ukunda airstrip or Mombasa SGR.',
        meals: 'Tropical Breakfast, Lunch',
        accommodation: 'Drop-off at Mombasa SGR or Ukunda',
        highlights: ['Kongo River paddle', 'White sand beach swim']
      }
    ],
    included: [
      'Private air-conditioned minibus transfers from Diani/Mombasa SGR',
      'Full day dhow cruise with dedicated crew & snorkel guides',
      'High-quality snorkel gear (mask, snorkel, fins, life jackets)',
      '1 night boutique eco-cottage accommodation in Diani',
      'Lavish Swahili seafood feast (vegetarian options available)'
    ],
    notIncluded: [
      'KWS Kisite Marine Park conservation fee (KSh 1,500 citizen/resident)',
      'Train ticket (SGR) from Nairobi to Mombasa'
    ],
    requirements: [
      'Swimwear and reef-safe sunscreen',
      'Waterproof phone pouch or action camera',
      'Light beachwear and sandals'
    ],
    cancellationPolicy: 'Free cancellation up to 5 days prior to departure.',
    isFeatured: true,
    isTrending: false,
    isPopular: true,
    isThisWeekend: false
  },
  {
    id: 'adv-amboseli-safari-06',
    slug: 'amboseli-kilimanjaro-tusker-road-trip',
    title: 'Amboseli Big Tusker Safari with Mount Kilimanjaro Sunrise',
    tagline: '3-day road trip tracking Kenya’s largest bull elephants under the snow-capped peak of Mount Kilimanjaro with Observation Hill sunset.',
    destination: 'Amboseli National Park (Kajiado)',
    region: 'Southern Kenya',
    category: 'Weekend Road Trips',
    difficulty: 'Easy',
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 19800,
    conservationLevy: 3200,
    featuredImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80', maraImg],
    rating: 4.96,
    reviewsCount: 104,
    availableDates: ['2026-10-09', '2026-10-23', '2026-11-06', '2026-11-20'],
    nextDepartureDateText: 'This Friday, 09 Oct',
    departureTime: '06:30 AM',
    registrationDeadline: 'Closes Wednesday 8:00 PM (2 seats left)',
    pickupHubs: ['Hilton Bus Station CBD (06:30 AM)', 'JKIA Gateway Area (07:00 AM)'],
    totalSeats: 12,
    availableSeats: 2,
    bookedSeatsCount: 10,
    isGuaranteedDeparture: true,
    experienceVibe: 'Classic Safari · Iconic Landscapes',
    meetingPoint: 'Nairobi Hilton Bus Station / JKIA Gateway',
    organizer: ORGANIZERS.maraTrails,
    overview: 'Watch giant bull elephants graze in emerald swamps against the immense snow peak of Mount Kilimanjaro. Traverse Amboseli’s dry lake beds, sulfur springs, and observation hill in an open pop-up safari Land Cruiser.',
    highlights: [
      'Unrivaled views of Mount Kilimanjaro on clear mornings and golden sunsets',
      'Observation Hill panoramic view over marshes teeming with pelicans and hippos',
      'Encounters with Kenya’s most famous elephant herds and big tuskers',
      'Full board safari lodge with swimming pool overlooking the waterhole'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli Plains & Afternoon Game Drive',
        description: 'Travel along the Nairobi-Mombasa highway into the Maasai plains. Arrive at safari camp for lunch. Afternoon game drive targeting lion prides and elephant herds.',
        meals: 'Lunch, Dinner',
        accommodation: 'Kilima Safari Camp (View of Kilimanjaro)',
        highlights: ['First sighting of Kilimanjaro peak', 'Elephants bathing in swamp']
      },
      {
        day: 2,
        title: 'Full Day Tracking Big Tuskers & Observation Hill Picnic',
        description: 'Early morning game drive while the mountain is cloud-free. Climb Observation Hill for 360-degree vista. Evening Maasai cultural boma visit.',
        meals: 'Breakfast, Bush Picnic Lunch, Dinner',
        accommodation: 'Kilima Safari Camp',
        highlights: ['Kilimanjaro golden hour silhouette', 'Observation Hill vista']
      },
      {
        day: 3,
        title: 'Dawn Safari & Return Road Trip to Nairobi',
        description: 'Dawn game drive, hearty breakfast, and return scenic drive to Nairobi by 4:00 PM.',
        meals: 'Breakfast, Lunch stop en route',
        accommodation: 'Drop-off at Nairobi pickup points',
        highlights: ['Morning birdlife photography', 'Emali curio market']
      }
    ],
    included: [
      'Custom 4x4 Safari Land Cruiser with pop-up roof',
      '2 nights full board safari camp accommodation',
      'All meals, professional certified safari guide',
      'Daily park excursions & game drives'
    ],
    notIncluded: [
      'KWS park entrance conservation fee (KSh 3,200 citizen/resident)',
      'Personal drinks & gratuities'
    ],
    requirements: [
      'National ID / Passport',
      'Dust-proof camera bag and sunglasses',
      'Warm fleece for early morning game drives'
    ],
    cancellationPolicy: 'Free cancellation up to 7 days before departure.',
    isFeatured: true,
    isTrending: false,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-elephanthill-07',
    slug: 'elephant-hill-aberdares-extreme-day-hike',
    title: 'Elephant Hill (3,658m) Aberdares Forest Extreme Day Hike',
    tagline: 'The ultimate fitness test: 18km high-altitude trail through the bamboo zone, elephant trails, and the Despair Ridge into Aberdares alpine moorland.',
    destination: 'Aberdare National Park (Njabini)',
    region: 'Central Highlands',
    category: 'Day Hikes & Trails',
    difficulty: 'Strenuous',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 4200,
    conservationLevy: 650,
    featuredImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', mtKenyaImg],
    rating: 4.94,
    reviewsCount: 132,
    availableDates: ['2026-10-11', '2026-10-18', '2026-10-25'],
    nextDepartureDateText: 'This Sunday, 11 Oct',
    departureTime: '05:30 AM (Strict)',
    registrationDeadline: 'Closes Friday 6:00 PM (3 seats left)',
    pickupHubs: ['Kencom House CBD (05:30 AM)', 'Westlands Shell (05:50 AM)'],
    totalSeats: 14,
    availableSeats: 3,
    bookedSeatsCount: 11,
    isGuaranteedDeparture: true,
    experienceVibe: 'Endurance Trail · Trail Community',
    meetingPoint: 'Kencom House CBD or Shell Westlands',
    organizer: ORGANIZERS.highlandAlpine,
    overview: 'The rite of passage for Kenya’s hiking community. 18 kilometers through ancient bamboo forests, the steep mud-scramble of "The Point of Despair", and the alpine moorland leading to the summit tail at 3,658m. Armed KWS ranger escorts ensure wildlife safety while our guides pace the group.',
    highlights: [
      'Climb to 3,658m above sea level with sweeping views of the Kinangop plateau',
      'Trek through bamboo arches frequented by Colobus monkeys and wild elephants',
      'Return to Nairobi in time for Sunday evening rest',
      'Wilderness First Responder lead guides with mountain pacing'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Njabini Forest Station, Hike to Summit & Return',
        description: 'Depart Nairobi at 05:30 AM. Arrive Njabini gate at 07:30 AM. Briefing and stretch before beginning the 7-hour trek through starting forest, bamboo zone, Despair, and summit tail. Return to Nairobi by 7:30 PM.',
        meals: 'Energy Snacks, Hot Post-Hike Soup & Tea, Water',
        accommodation: 'Same day return to Nairobi',
        highlights: ['Point of Despair climb', 'Alpine moorland crest', 'Post-hike hot soup']
      }
    ],
    included: [
      'Round trip tour bus transport from Nairobi CBD/Westlands',
      'Armed KWS escort rangers and certified mountain guides',
      'Post-hike hot herbal tea and snack service',
      'First aid & emergency support'
    ],
    notIncluded: [
      'KWS park entrance conservation fee (KSh 650 citizen/resident)',
      'Personal hydration bladder & energy trail food'
    ],
    requirements: [
      'Proper waterproof hiking boots with deep lugs/grip',
      'Warm fleece, waterproof rain jacket or poncho',
      'Hiking pole / walking stick, minimum 3 liters of water'
    ],
    cancellationPolicy: 'Free reschedule if cancelled 24 hours prior.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-ngonghills-08',
    slug: 'ngong-hills-adventure',
    title: 'NGONG HILLS ADVENTURE',
    tagline: 'Scenic ridge adventure across wind-swept green peaks overlooking the Great Rift Valley, with fresh mountain air and open trail.',
    destination: 'Nairobi, Kenya',
    region: 'Nairobi Environs',
    category: 'Day Hikes & Trails',
    difficulty: 'Moderate',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 1500,
    conservationLevy: 300,
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', hellsGateImg],
    rating: 4.8,
    reviewsCount: 164,
    availableDates: ['2026-10-31', '2026-11-07', '2026-11-14'],
    nextDepartureDateText: 'Saturday, 31 October',
    departureTime: '07:30 AM',
    registrationDeadline: 'Closes Friday 8:00 PM',
    pickupHubs: ['Kencom House CBD (07:30 AM)', 'Prestige Plaza Ngong Road (08:00 AM)'],
    totalSeats: 20,
    availableSeats: 12,
    bookedSeatsCount: 8,
    isGuaranteedDeparture: true,
    experienceVibe: 'Active Ridge Trail · Beginners Welcome',
    meetingPoint: 'Kencom House CBD or Prestige Plaza Ngong Road',
    organizer: ORGANIZERS.riftNomads,
    overview: 'Traverse the undulating 7 peaks of the Ngong Hills ridge, with Nairobi skyline on one side and the dramatic Great Rift Valley drop on the other. Enjoy crisp breezes under towering wind turbines and finish with an open-air trail social.',
    highlights: [
      'Panoramic 360° views across Nairobi and the Great Rift Valley',
      'Traverse all 7 green peaks under towering wind turbines',
      'Fresh trail refreshments and mountain picnic stop',
      'Beginner-friendly pace with experienced guides'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Ngong Gate, 7-Peaks Ridge Trek & Social',
        description: 'Meet at Kencom at 07:30 AM. Arrive at Ngong gate by 08:45 AM. Hike the 12km ridge to Kona Baridi. Feasting and social till 4:30 PM before returning to Nairobi by 6:00 PM.',
        meals: 'Energy Snacks, Fresh Water, Sodas',
        accommodation: 'Same day return to Nairobi',
        highlights: ['Wind turbine ridge walk', 'Kona Baridi descent', 'Social picnic']
      }
    ],
    included: [
      'Return coaster bus transport from Nairobi CBD / Ngong Road',
      'Forest guide and armed Kenya Forest Service ranger',
      'Packed energy trail snacks and refreshments',
      'Bottled drinking water'
    ],
    notIncluded: [
      'KFS forest entry permit (KSh 300 citizen/resident)'
    ],
    requirements: [
      'Comfortable trainers or walking shoes',
      'Sunglasses, sunscreen, hat',
      'Light backpack with 2L water'
    ],
    cancellationPolicy: 'Full refund if cancelled 24 hours prior.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: false
  },
  {
    id: 'adv-karura-09',
    slug: 'karura-forest-canopy-trail-picnic',
    title: 'Karura Forest Hidden Waterfalls & Canopy Trail',
    tagline: 'Invigorating morning escape discovering Mau Mau caves, sacred waterfalls, bamboo glades and fresh artisan picnic under the indigenous tree canopy.',
    destination: 'Nairobi, Kenya',
    region: 'Nairobi Environs',
    category: 'Day Hikes & Trails',
    difficulty: 'Easy',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 1800,
    conservationLevy: 200,
    featuredImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.9,
    reviewsCount: 78,
    availableDates: ['2026-10-18', '2026-10-25'],
    nextDepartureDateText: 'Sunday, 18 Oct',
    departureTime: '08:30 AM',
    registrationDeadline: 'Closes Saturday 6:00 PM',
    pickupHubs: ['Gate A Limuru Road (08:30 AM)', 'Sarit Westlands (08:15 AM)'],
    totalSeats: 16,
    availableSeats: 8,
    bookedSeatsCount: 8,
    isGuaranteedDeparture: true,
    experienceVibe: 'Urban Forest Escape · Relaxation',
    meetingPoint: 'Karura Forest Gate A, Limuru Road',
    organizer: ORGANIZERS.riftNomads,
    overview: 'Step into the tranquil sanctuary of Karura Forest right in Nairobi. Walk shaded trails to the 15-meter Karura Waterfall, explore ancient Mau Mau hiding caves, and unwind with fresh juice and snacks on the manicured River Café lawns.',
    highlights: [
      'Explore hidden Mau Mau freedom-fighter caves',
      'Visit the rushing Karura waterfall and bamboo grove',
      'Gentle shaded 10km walking or cycling loop',
      'Return to your afternoon by 1:30 PM'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Morning Canopy Walk & Waterfall Discovery',
        description: 'Meet at Sarit or Gate A. Guided nature trail loop to waterfall, caves and lily pond. Relaxed picnic on the grass before midday finish.',
        meals: 'Fresh Juice, Croissant, Fruits, Water',
        accommodation: 'Same day finish in Nairobi',
        highlights: ['Waterfall mist', 'Mau Mau caves', 'Canopy bird watching']
      }
    ],
    included: [
      'Local nature guide and tree identification expert',
      'Packed gourmet morning picnic & bottled water',
      'First aid escort'
    ],
    notIncluded: [
      'Karura Forest entry ticket (KSh 200 citizen/resident)'
    ],
    requirements: [
      'Comfortable walking shoes',
      'Water bottle and light jacket'
    ],
    cancellationPolicy: 'Free cancellation up to 12 hours prior.',
    isFeatured: false,
    isTrending: false,
    isPopular: false,
    isThisWeekend: false,
    isNew: true
  },
  {
    id: 'adv-watamu-10',
    slug: 'watamu-marine-reserve-coral-dhow',
    title: 'Watamu Marine Reserve Coral Dhow & Turtle Walk',
    tagline: 'Weekend coastal flight & dhow escape: sail pristine crystal channels, snorkel coral gardens with sea turtles, and explore mangrove sandbars.',
    destination: 'Watamu, Coast',
    region: 'North Coast',
    category: 'Coastal & Water',
    difficulty: 'Easy',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 14500,
    conservationLevy: 1200,
    featuredImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', dianiImg],
    rating: 4.95,
    reviewsCount: 42,
    availableDates: ['2026-10-24', '2026-10-31'],
    nextDepartureDateText: 'Saturday, 24 Oct',
    departureTime: '08:00 AM',
    registrationDeadline: 'Closes Wednesday 8:00 PM',
    pickupHubs: ['Malindi Airport / Watamu Town (08:00 AM)'],
    totalSeats: 12,
    availableSeats: 5,
    bookedSeatsCount: 7,
    isGuaranteedDeparture: true,
    experienceVibe: 'Marine Safari · Sandbank Chill',
    meetingPoint: 'Watamu Bay Beach Club Staging Point',
    organizer: ORGANIZERS.swahiliDhow,
    overview: 'Unwind on the world-renowned shores of Watamu. Board a handcrafted wooden dhow to the marine national park for world-class reef snorkeling among green sea turtles. Float along the Mida Creek boardwalk at sunset with fresh samosas.',
    highlights: [
      'Snorkel with wild sea turtles at the marine park reef',
      'Cruise into the glowing turquoise sandbars of Garoda',
      'Sunset mangrove canoe expedition in Mida Creek',
      'Swahili seafood lunch cooked on board'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Watamu Marine Snorkel & Sandbar Sail',
        description: 'Board at 08:30 AM. Sail to coral gardens for 2 hours of snorkeling. Sandbar swim and fresh fish lunch on the dhow. Afternoon check-in at beachfront hotel.',
        meals: 'Dhow Seafood Lunch, Fresh Coconut Water',
        accommodation: 'Watamu Beachfront Eco-Lodge',
        highlights: ['Sea turtle encounter', 'Garoda sandbar', 'Dhow sailing']
      },
      {
        day: 2,
        title: 'Mida Creek Mangroves & Turtle Watch Walk',
        description: 'Morning visit to Local Ocean Conservation turtle rescue center. Boardwalk tour across Mida Creek before airport transfer.',
        meals: 'Tropical Breakfast',
        accommodation: 'Return transfer',
        highlights: ['Turtle conservation center', 'Mida Creek boardwalk']
      }
    ],
    included: [
      'Full day dhow charter, snorkel gear & life jackets',
      '1 night beachfront eco-lodge stay',
      'All meals on board and breakfast',
      'Marine park licensed boat captain'
    ],
    notIncluded: [
      'KWS marine park conservation fee (KSh 1,200 citizen/resident)'
    ],
    requirements: [
      'Swimwear, reef shoes, sunglasses',
      'Sunscreen and beach towel'
    ],
    cancellationPolicy: 'Free cancellation up to 4 days prior.',
    isFeatured: false,
    isTrending: true,
    isPopular: false,
    isThisWeekend: false,
    isNew: true
  },
  {
    id: 'adv-mara-safari-pop',
    slug: 'maasai-mara-safari',
    title: 'Maasai Mara Safari',
    tagline: 'Classic overland safari tracking cheetah coalitions and lion prides across the Mara savannah.',
    destination: 'Maasai Mara National Reserve',
    region: 'Southwest Kenya',
    category: 'Safari & Wildlife',
    difficulty: 'Easy',
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 8500,
    conservationLevy: 2500,
    featuredImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.95,
    reviewsCount: 194,
    availableDates: ['2026-10-10', '2026-10-17', '2026-10-24', '2026-10-31'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '06:30 AM',
    registrationDeadline: 'Closes Thursday 6:00 PM',
    pickupHubs: ['Kencom House CBD (06:30 AM)', 'Westlands Sarit (07:00 AM)'],
    totalSeats: 16,
    availableSeats: 4,
    bookedSeatsCount: 12,
    isGuaranteedDeparture: true,
    experienceVibe: 'Big 5 Safari · Overland Cruiser',
    meetingPoint: 'Kencom House CBD or Sarit Westlands',
    organizer: ORGANIZERS.maraTrails,
    overview: 'Experience the world’s most celebrated wildlife sanctuary. 4x4 Land Cruiser game drives tracking the Big 5, sundowners over the Mara river, and comfortable safari camp stays.',
    highlights: ['Pop-up roof Land Cruiser', 'Sunset lion tracking', 'Campfire dinner with Maasai guides'],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Mara Plains & Afternoon Game Drive',
        description: 'Depart Nairobi early morning, stopping at the Rift escarpment. Check into camp for lunch before an introductory golden hour safari.',
        meals: 'Lunch, Dinner',
        accommodation: 'Enkorok Safari Camp',
        highlights: ['Rift Valley photo stop', 'Sunset game drive']
      }
    ],
    included: ['Transport in 4x4 Land Cruiser', 'Full board camp stay', 'Game drives and certified guide'],
    notIncluded: ['Park entrance fee (KSh 2,500 citizen/resident)'],
    requirements: ['National ID / Passport', 'Warm jacket for morning game drive'],
    cancellationPolicy: 'Free cancellation up to 48 hours before departure.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-mtkenya-hiking-pop',
    slug: 'mount-kenya-hiking-adventure',
    title: 'Mount Kenya Hiking Adventure',
    tagline: 'High-altitude mountain trek through giant moorlands, alpine bamboo groves, and glacial streams.',
    destination: 'Mount Kenya National Park',
    region: 'Central Highlands',
    category: 'Hiking & Outdoor',
    difficulty: 'Moderate',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 6500,
    conservationLevy: 1800,
    featuredImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.92,
    reviewsCount: 148,
    availableDates: ['2026-10-10', '2026-10-17', '2026-10-24'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '06:00 AM',
    registrationDeadline: 'Closes Friday 12:00 PM',
    pickupHubs: ['Museum Hill Nairobi (06:00 AM)', 'Thika Road Mall (06:30 AM)'],
    totalSeats: 14,
    availableSeats: 6,
    bookedSeatsCount: 8,
    isGuaranteedDeparture: true,
    experienceVibe: 'Mountain Adventure · Fresh Air',
    meetingPoint: 'Nairobi National Museum Grounds',
    organizer: ORGANIZERS.highlandAlpine,
    overview: 'Breathe pristine mountain air on Mount Kenya. Trek from Sirimon Gate through indigenous cedar forests to Old Moses Mountain Camp at 3,300m with views of equatorial peaks.',
    highlights: ['Sirimon bamboo forest walk', 'Old Moses high altitude camp', 'Mountain birdlife and views'],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Sirimon Gate & Old Moses Camp',
        description: 'Depart Nairobi early morning, trek 3.5 hours to Old Moses camp. Hot chai and alpine sunset.',
        meals: 'Lunch, Hot Mountain Dinner',
        accommodation: 'Old Moses Alpine Bunks',
        highlights: ['Sirimon forest walk', 'Alpine sunset']
      }
    ],
    included: ['Return transport from Nairobi', 'Mountain guide, chef, and porters', 'All meals and lodging'],
    notIncluded: ['Park fees (KSh 1,800 citizen/resident)'],
    requirements: ['Hiking boots, warm thermal jacket, sleeping bag'],
    cancellationPolicy: 'Full refund up to 72 hours prior.',
    isFeatured: true,
    isTrending: false,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-diani-escape-pop',
    slug: 'diani-beach-escape',
    title: 'Diani Beach Escape',
    tagline: 'Warm tropical ocean, swaying palms, traditional sailing dhow, and fresh Swahili coastal cuisine.',
    destination: 'Diani Beach, South Coast',
    region: 'South Coast',
    category: 'Beach Escapes',
    difficulty: 'Easy',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 7500,
    conservationLevy: 1000,
    featuredImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.90,
    reviewsCount: 162,
    availableDates: ['2026-10-10', '2026-10-17', '2026-10-24', '2026-10-31'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '07:30 AM',
    registrationDeadline: 'Closes Friday 4:00 PM',
    pickupHubs: ['Mombasa SGR Terminus (07:30 AM)', 'Diani Beach Road (08:15 AM)'],
    totalSeats: 18,
    availableSeats: 8,
    bookedSeatsCount: 10,
    isGuaranteedDeparture: true,
    experienceVibe: 'Beach Getaway · Island Chill',
    meetingPoint: 'Mombasa SGR Terminus or Diani Junction',
    organizer: ORGANIZERS.swahiliDhow,
    overview: 'Escape to Kenya’s award-winning powder-white sands. Enjoy dhow sailing, snorkeling in crystal turquoise shallows, and relaxing at a beachfront boutique eco-stay.',
    highlights: ['Traditional dhow boat sail', 'Snorkeling in turquoise waters', 'Swahili seafood lunch'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Sandbank Dhow Cruise',
        description: 'Morning pickup, transfer to Diani beach resort, dhow cruise with fresh coconut drinks and snorkel stop.',
        meals: 'Seafood Lunch, Welcome Drinks',
        accommodation: 'Diani Beachfront Eco-Resort',
        highlights: ['White sand swim', 'Dhow sailing']
      }
    ],
    included: ['Transfers from Mombasa SGR/Ukunda', 'Dhow cruise and snorkel gear', 'Beachfront stay and breakfast'],
    notIncluded: ['Personal drinks outside meals'],
    requirements: ['Swimwear, reef shoes, sunglasses'],
    cancellationPolicy: 'Free cancellation up to 48 hours before.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-naivasha-camping-pop',
    slug: 'lake-naivasha-camping',
    title: 'Lake Naivasha Camping',
    tagline: 'Lake shore bush camp with roaming giraffes, open acacia campfire, and scenic morning boat cruise.',
    destination: 'Lake Naivasha, Rift Valley',
    region: 'Great Rift Valley',
    category: 'Camping',
    difficulty: 'Easy',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 5500,
    conservationLevy: 1000,
    featuredImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.88,
    reviewsCount: 136,
    availableDates: ['2026-10-10', '2026-10-17', '2026-10-24', '2026-10-31'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '07:30 AM',
    registrationDeadline: 'Closes Friday 3:00 PM',
    pickupHubs: ['National Museum Hill (07:30 AM)', 'Westlands Shell (07:50 AM)'],
    totalSeats: 16,
    availableSeats: 5,
    bookedSeatsCount: 11,
    isGuaranteedDeparture: true,
    experienceVibe: 'Campfire & Social · Weekend Bushcraft',
    meetingPoint: 'Nairobi National Museum Grounds',
    organizer: ORGANIZERS.riftNomads,
    overview: 'The perfect Saturday-Sunday retreat. Pitch tents under yellow fever trees on the banks of Lake Naivasha, take a speedboat safari spotting hippos and fish eagles, and roast nyama choma around the evening campfire.',
    highlights: ['Campfire nyama choma feast', 'Speedboat safari with fish eagles', 'Walk near zebras and giraffes'],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Naivasha & Lake Shore Campout',
        description: 'Depart Nairobi at 07:30 AM. Arrive at campsite, boat ride on the lake, evening barbecue by the campfire.',
        meals: 'Picnic Lunch, Evening Barbecue',
        accommodation: 'Lakeside Safari Canvas Tents',
        highlights: ['Boat ride with hippos', 'Campfire barbecue']
      }
    ],
    included: ['Return transport from Nairobi', 'All camping equipment (tent, mattress, sleeping bag)', 'Chef-prepared meals'],
    notIncluded: ['Sanctuary entry fee (KSh 1,000 citizen/resident)'],
    requirements: ['Warm hoodie for the night, flashlight/headlamp'],
    cancellationPolicy: 'Free cancellation up to 48 hours prior.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-hellsgate-cycling-trend',
    slug: 'hells-gate-cycling',
    title: 'Hell’s Gate Cycling',
    tagline: 'Adrenaline cycling through volcanic gorges and cliffs alongside wild zebras and gazelles.',
    destination: 'Hell’s Gate National Park (Naivasha)',
    region: 'Great Rift Valley',
    category: 'Hiking & Outdoor',
    difficulty: 'Moderate',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 4900,
    conservationLevy: 800,
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.88,
    reviewsCount: 142,
    availableDates: ['2026-10-10', '2026-10-17', '2026-10-24', '2026-10-31'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '06:15 AM',
    registrationDeadline: 'Closes Friday 6:00 PM',
    pickupHubs: ['Kencom House CBD (06:15 AM)', 'Sarit Centre Westlands (06:45 AM)'],
    totalSeats: 16,
    availableSeats: 3,
    bookedSeatsCount: 13,
    isGuaranteedDeparture: true,
    experienceVibe: 'Active Day Escape · Cycling & Canyons',
    meetingPoint: 'Kencom House CBD or Sarit Westlands',
    organizer: ORGANIZERS.riftNomads,
    overview: 'Ride geared mountain bikes past towering rock towers and grazing plains game, scramble through Ol Njorowa Gorge, and soak in natural hot springs before returning home Saturday evening.',
    highlights: ['Wildlife cycling in open savanna', 'Gorge slot canyon scramble', 'Geothermal hot pool soak'],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Hell’s Gate Cycling & Canyon Walk',
        description: 'Depart Nairobi 06:15 AM, ride bikes through the park, explore the canyon with guide, return by 7:30 PM.',
        meals: 'Energy Snacks & Water',
        accommodation: 'Same day return',
        highlights: ['Volcanic scenery', 'Canyon scramble']
      }
    ],
    included: ['Transport from Nairobi', 'Mountain bike hire & helmet', 'Canyon guide'],
    notIncluded: ['Park fees (KSh 800 citizen/resident)'],
    requirements: ['Comfortable trainers, daypack, water'],
    cancellationPolicy: 'Full refund 24 hours prior.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-naivasha-boat-trend',
    slug: 'naivasha-boat-ride',
    title: 'Naivasha Boat Ride',
    tagline: 'Motorized lake cruise with African fish eagles, hippo pods, and scenic Crescent Island shores.',
    destination: 'Lake Naivasha, Rift Valley',
    region: 'Great Rift Valley',
    category: 'Water Activities',
    difficulty: 'Easy',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 3200,
    conservationLevy: 600,
    featuredImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.86,
    reviewsCount: 94,
    availableDates: ['2026-10-10', '2026-10-11', '2026-10-17', '2026-10-18'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '08:00 AM',
    registrationDeadline: 'Closes Friday 8:00 PM',
    pickupHubs: ['National Museum Hill (08:00 AM)', 'Westlands Shell (08:20 AM)'],
    totalSeats: 12,
    availableSeats: 6,
    bookedSeatsCount: 6,
    isGuaranteedDeparture: true,
    experienceVibe: 'Water Safari · Family & Friends',
    meetingPoint: 'Nairobi National Museum Grounds',
    organizer: ORGANIZERS.riftNomads,
    overview: 'Glide through shimmering Rift Valley waters on a captained speedboat. Watch majestic African fish eagles dive for fish and observe bloats of hippos basking in the lake grass.',
    highlights: ['Fish eagle hunting demonstration', 'Hippo pod viewing at safe distance', 'Relaxed lake breeze lunch'],
    itinerary: [
      {
        day: 1,
        title: 'Morning Cruise on Lake Naivasha',
        description: 'Depart Nairobi 08:00 AM, 2-hour guided boat tour on the lake, lakeside lunch, return by 5:00 PM.',
        meals: 'Lakeside Lunch, Fresh Juice',
        accommodation: 'Same day return',
        highlights: ['Boat cruise', 'Fish eagle photo op']
      }
    ],
    included: ['Round trip transport', 'Boat cruise & life jackets', 'Lunch'],
    notIncluded: ['Personal extras'],
    requirements: ['Sun hat, sunglasses, camera'],
    cancellationPolicy: 'Free cancellation up to 24 hours before.',
    isFeatured: false,
    isTrending: true,
    isPopular: false,
    isThisWeekend: true
  },
  {
    id: 'adv-mombasa-beach-trend',
    slug: 'mombasa-beach-escape',
    title: 'Mombasa Beach Escape',
    tagline: 'Swahili coastal weekend: Fort Jesus history, ocean breeze, and Nyali beach relaxation.',
    destination: 'Mombasa, Coast',
    region: 'Coast',
    category: 'Beach Escapes',
    difficulty: 'Easy',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 6800,
    conservationLevy: 500,
    featuredImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.84,
    reviewsCount: 112,
    availableDates: ['2026-10-10', '2026-10-17', '2026-10-24'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '08:00 AM',
    registrationDeadline: 'Closes Thursday 10:00 PM',
    pickupHubs: ['Mombasa SGR Terminus (08:00 AM)', 'Nyali Centre (08:45 AM)'],
    totalSeats: 15,
    availableSeats: 7,
    bookedSeatsCount: 8,
    isGuaranteedDeparture: true,
    experienceVibe: 'Coastal Culture · Chill & Food',
    meetingPoint: 'Mombasa SGR Terminus or Nyali Centre',
    organizer: ORGANIZERS.swahiliDhow,
    overview: 'Soak up the Indian Ocean sun along Mombasa’s North Coast. Stroll Old Town alleys, enjoy authentic biryani, and lounge on tropical sands.',
    highlights: ['Old Town Swahili architectural walk', 'Nyali beach relaxation', 'Fresh street food tasting'],
    itinerary: [
      {
        day: 1,
        title: 'Mombasa Old Town & Beachfront Sunset',
        description: 'Morning pickup from SGR, Old Town tour, hotel check-in and beach sunset.',
        meals: 'Swahili Lunch & Breakfast',
        accommodation: 'Nyali Beachfront Hotel',
        highlights: ['Old Town alleys', 'Beach sunset']
      }
    ],
    included: ['Transfers from Mombasa SGR', 'Hotel accommodation & breakfast', 'Guided historical walking tour'],
    notIncluded: ['Fort Jesus entry ticket (KSh 200)'],
    requirements: ['Comfortable sandals, beachwear'],
    cancellationPolicy: 'Free cancellation up to 48 hours prior.',
    isFeatured: false,
    isTrending: true,
    isPopular: false,
    isThisWeekend: true
  },
  {
    id: 'adv-amboseli-safari-trend',
    slug: 'amboseli-safari',
    title: 'Amboseli Safari',
    tagline: 'World-famous big tusker elephants roaming swamp plains beneath Mount Kilimanjaro’s snowy summit.',
    destination: 'Amboseli National Park',
    region: 'Southern Kenya',
    category: 'Safari & Wildlife',
    difficulty: 'Easy',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 8900,
    conservationLevy: 2200,
    featuredImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.93,
    reviewsCount: 156,
    availableDates: ['2026-10-10', '2026-10-17', '2026-10-24'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '06:00 AM',
    registrationDeadline: 'Closes Friday 2:00 PM',
    pickupHubs: ['Kencom House CBD (06:00 AM)', 'Prestige Plaza Ngong Rd (06:25 AM)'],
    totalSeats: 14,
    availableSeats: 4,
    bookedSeatsCount: 10,
    isGuaranteedDeparture: true,
    experienceVibe: 'Big Tuskers · Kilimanjaro Vista',
    meetingPoint: 'Kencom House CBD',
    organizer: ORGANIZERS.maraTrails,
    overview: 'Watch elephants bathe in emerald marshlands with Africa’s highest snow-capped mountain as your backdrop. 4x4 game drives and safari lodge stay.',
    highlights: ['Kilimanjaro mountain backdrop', 'Big tusker elephant encounters', 'Observation Hill panoramic views'],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli & Afternoon Marshland Drive',
        description: 'Depart Nairobi 06:00 AM, arrive at camp for lunch, afternoon game drive among elephant herds.',
        meals: 'Lunch, Dinner',
        accommodation: 'Kilima Safari Camp',
        highlights: ['Kilimanjaro views', 'Elephant swamps']
      }
    ],
    included: ['Transport in 4x4 Safari Cruiser', '1 night full board lodge stay', 'Daily game drives with guide'],
    notIncluded: ['Park fees (KSh 2,200 citizen/resident)'],
    requirements: ['National ID / Passport, camera, sunglasses'],
    cancellationPolicy: 'Free cancellation up to 48 hours prior.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-diani-getaway-escape',
    slug: 'diani-beach-getaway',
    title: 'DIANI BEACH GETAWAY',
    tagline: 'Short trips. Big memories. 2 days on Kenya’s top tropical coast.',
    destination: 'Diani Beach, South Coast',
    region: 'South Coast',
    category: 'Beach Escapes',
    difficulty: 'Easy',
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 7500,
    conservationLevy: 1000,
    featuredImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85',
    galleryImages: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85'],
    rating: 4.94,
    reviewsCount: 188,
    availableDates: ['2026-10-10', '2026-10-17', '2026-10-24', '2026-10-31'],
    nextDepartureDateText: 'This Saturday, 10 Oct',
    departureTime: '07:30 AM',
    registrationDeadline: 'Closes Friday 4:00 PM',
    pickupHubs: ['Mombasa SGR Terminus (07:30 AM)', 'Diani Junction (08:15 AM)'],
    totalSeats: 16,
    availableSeats: 7,
    bookedSeatsCount: 9,
    isGuaranteedDeparture: true,
    experienceVibe: 'Weekend Escape · Beach & Sunshine',
    meetingPoint: 'Mombasa SGR Terminus or Diani Beach Road',
    organizer: ORGANIZERS.swahiliDhow,
    overview: 'Take the Madaraka Express train to Mombasa and slip into relaxation. White sands, clear Indian Ocean waters, and coconut palms.',
    highlights: ['Pristine white sand swimming', 'Sunset beach strolls', 'Swahili dining'],
    itinerary: [
      {
        day: 1,
        title: 'SGR Transfer & Beach Day',
        description: 'Morning transfer from SGR, afternoon leisure by the sea, evening seafood dinner.',
        meals: 'Welcome Drinks, Dinner',
        accommodation: 'Diani Coastal Boutique Lodge',
        highlights: ['White sand swim', 'Sunset cocktails']
      }
    ],
    included: ['Transfers from Mombasa SGR', 'Overnight boutique lodge stay & breakfast'],
    notIncluded: ['Personal drinks outside meals'],
    requirements: ['Beachwear, sunscreen'],
    cancellationPolicy: 'Free cancellation up to 48 hours prior.',
    isFeatured: true,
    isTrending: true,
    isPopular: true,
    isThisWeekend: true
  },
  {
    id: 'adv-longonot-sunrise',
    slug: 'mount-longonot-crater-sunrise',
    title: 'Mount Longonot Crater Sunrise Rim Trek',
    tagline: 'Catch dawn breaking over the Great Rift Valley from the rim of a sleeping volcano with crater floor forest.',
    destination: 'Mount Longonot National Park',
    region: 'Great Rift Valley',
    category: 'Hiking & Outdoor',
    difficulty: 'Moderate',
    durationDays: 1,
    durationNights: 0,
    pricePerPerson: 3400,
    conservationLevy: 600,
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'],
    rating: 4.89,
    reviewsCount: 110,
    availableDates: ['2026-10-11', '2026-10-18', '2026-10-25'],
    nextDepartureDateText: 'This Sunday, 11 Oct',
    departureTime: '04:30 AM (Dawn Departure)',
    registrationDeadline: 'Closes Friday 8:00 PM',
    pickupHubs: ['Kencom House CBD (04:30 AM)', 'Westlands Shell (04:50 AM)'],
    totalSeats: 16,
    availableSeats: 6,
    bookedSeatsCount: 10,
    isGuaranteedDeparture: true,
    experienceVibe: 'Sunrise Hike · Volcano Crater',
    meetingPoint: 'Kencom House CBD or Shell Westlands',
    organizer: ORGANIZERS.riftNomads,
    overview: 'Depart Nairobi in the pre-dawn quiet to hike up the volcanic slope and reach the crater rim just as the first sun rays light up Lake Naivasha and the Great Rift floor.',
    highlights: ['Sunrise over the Great Rift Valley', '7.2km crater rim trek', 'Steam vents on volcanic crater floor'],
    itinerary: [
      {
        day: 1,
        title: 'Dawn Drive & Sunrise Crater Climb',
        description: 'Depart 04:30 AM, reach park gate by 06:00 AM, climb to rim for sunrise, complete rim loop, hot breakfast in Naivasha, return by 3:00 PM.',
        meals: 'Post-hike Breakfast & Trail Snacks',
        accommodation: 'Same day return',
        highlights: ['Crater sunrise', 'Volcanic rim hike']
      }
    ],
    included: ['Return transport from Nairobi', 'Park escort guide', 'Hot breakfast after hike'],
    notIncluded: ['Park fees (KSh 600 citizen/resident)'],
    requirements: ['Hiking shoes with good traction, headlamp, light fleece'],
    cancellationPolicy: 'Free cancellation up to 24 hours before.',
    isFeatured: true,
    isTrending: false,
    isPopular: false,
    isThisWeekend: true
  }
];

export const EXPERIENCE_CATEGORIES = [
  {
    name: 'Hiking & Outdoor',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    count: '24 Trips'
  },
  {
    name: 'Safari & Wildlife',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    count: '18 Trips'
  },
  {
    name: 'Beach Escapes',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    count: '12 Trips'
  },
  {
    name: 'Road Trips',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    count: '16 Trips'
  },
  {
    name: 'Camping',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    count: '11 Trips'
  },
  {
    name: 'Cultural Experiences',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80',
    count: '8 Trips'
  },
  {
    name: 'Water Activities',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    count: '9 Trips'
  }
];

export const EDITORIAL_DESTINATIONS = [
  {
    name: 'Nairobi',
    region: 'Central Kenya',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tagline: 'Hikes, ridges & urban bush getaways',
    count: 14,
    size: 'large'
  },
  {
    name: 'Naivasha',
    region: 'Rift Valley',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    tagline: 'Canyons, boat safaris & lakeside camping',
    count: 12,
    size: 'tall'
  },
  {
    name: 'Diani',
    region: 'South Coast',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    tagline: 'White sand beaches & sailing dhows',
    count: 8,
    size: 'regular'
  },
  {
    name: 'Mombasa',
    region: 'Coast',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tagline: 'Historical Swahili coasts & ocean getaways',
    count: 6,
    size: 'regular'
  },
  {
    name: 'Maasai Mara',
    region: 'Southwest',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    tagline: 'Big Cats overland expeditions & legendary savannah',
    count: 10,
    size: 'large'
  },
  {
    name: 'Amboseli',
    region: 'Southern Kenya',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    tagline: 'Big tuskers with Kilimanjaro sunrise views',
    count: 7,
    size: 'regular'
  },
  {
    name: 'Mount Kenya',
    region: 'Central Highlands',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    tagline: 'Alpine peaks, tarns & glacial trekking',
    count: 9,
    size: 'tall'
  }
];

export const QUICK_CATEGORIES = [
  { name: 'This Weekend (Sat 10 Oct)', icon: 'Clock', count: 18, highlight: true },
  { name: 'Day Hikes & Trails', icon: 'Footprints', count: 12, highlight: false },
  { name: 'Overnight Bush Camps', icon: 'Tent', count: 9, highlight: false },
  { name: 'Weekend Road Trips', icon: 'Car', count: 14, highlight: false },
  { name: 'Under KSh 6,000', icon: 'Zap', count: 8, highlight: false },
  { name: 'Alpine Summits', icon: 'Mountain', count: 6, highlight: false }
];

export const LIVE_BOOKING_FEED = [
  { traveler: 'Brian K.', trip: 'Hell’s Gate Gorge Cycling', seats: 2, timeAgo: '8 mins ago' },
  { traveler: 'Wanjiku M.', trip: 'Lake Naivasha Bush Camp', seats: 1, timeAgo: '19 mins ago' },
  { traveler: 'David O.', trip: 'Mount Kenya Summit Trek', seats: 2, timeAgo: '42 mins ago' },
  { traveler: 'Amina S.', trip: 'Maasai Mara Big Cats Overland', seats: 3, timeAgo: '1 hr ago' }
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Wanjiku Kamau',
    location: 'Nairobi, Kenya',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: '3 days ago',
    tripTaken: 'Hell’s Gate Gorge Cycling',
    content: 'Booked on Friday night, hopped on the bus at Kencom at 6 AM Saturday morning. The bikes were ready at Elsa Gate and scrambling the gorge was insane. Best way to spend Saturday away from Nairobi traffic!',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    author: 'David Mwangi',
    location: 'Nakuru, Kenya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: '1 week ago',
    tripTaken: 'Mount Kenya Point Lenana Summit',
    content: 'The Highland Alpine crew ran a tight ship with altitude acclimation. Fresh hot food even at 4,200m at Shipton’s Camp. Stepping onto Point Lenana as the sun cracked over the clouds was pure magic.',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    author: 'Faith Chebet',
    location: 'Eldoret, Kenya',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: '2 weeks ago',
    tripTaken: 'Lake Naivasha Crescent Island Camp',
    content: 'Walking right up to Maasai giraffes on Crescent Island felt like Jurassic Park without the carnivores! Campfire nyama choma at night with the group was awesome. Instant M-Pesa STK booking made it so simple.',
    verifiedPurchase: true
  }
];
