import { initializeWalrusFromEnv } from '@/lib/walrus-integration';
import { getWalrusIndexManager } from '@/lib/walrus-index';
import { normalizeFullFact } from '@/lib/utils/fact-normalizer';
import type { FullFact, Fact, FactTag } from '@/types/fact';

const SAMPLE_FACTS: FullFact[] = [
  // Space & Astronomy Facts
  {
    id: 'galactic-ocean-1',
    title: "Saturn's moon Enceladus contains hydrothermal vents",
    summary: 'Cassini data suggests warm hydrothermal activity consistent with silica nanoparticles found in plumes.',
    fullContent: 'Cassini flybys detected silica nanoparticles in the plume of Enceladus. Their composition and size imply they formed in warm hydrothermal environments beneath the icy crust, suggesting liquid water pockets heated by tidal forces.',
    sources: ['https://saturn.jpl.nasa.gov/resources/7038/enceladus-hydrothermal-activity/'],
    metadata: {
      created: new Date('2024-06-01T12:00:00Z'),
      updated: new Date('2024-07-15T09:30:00Z'),
      lastModified: new Date('2024-07-15T09:30:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'space', category: 'topic' },
        { name: 'astronomy', category: 'domain' },
        { name: 'saturn', category: 'topic' },
        { name: 'hydrothermal', category: 'topic' },
      ] as FactTag[],
      importance: 8,
      region: 'global',
    },
    status: 'verified',
    votes: 1243,
    comments: 89,
    author: 'anon-4f8c',
    updated: '2h ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'alpha-centauri-2',
    title: 'No confirmed exoplanets yet in Alpha Centauri',
    summary: 'A circulating blog post claims a discovery, but no peer-reviewed source currently corroborates it.',
    fullContent: 'Despite frequent rumors, the closest verified detection is the Proxima Centauri b discovery in 2016. The Alpha Centauri AB system has ongoing radial velocity campaigns, but no statistically significant detection has been published.',
    sources: ['https://www.eso.org/public/news/eso1629/'],
    metadata: {
      created: new Date('2024-06-21T10:00:00Z'),
      updated: new Date('2024-08-02T11:15:00Z'),
      lastModified: new Date('2024-08-02T11:15:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'space', category: 'topic' },
        { name: 'exoplanets', category: 'topic' },
        { name: 'verification', category: 'methodology' },
        { name: 'alpha-centauri', category: 'topic' },
      ] as FactTag[],
      importance: 6,
      region: 'global',
    },
    status: 'review',
    votes: 312,
    comments: 45,
    author: 'anon-a21e',
    updated: '6h ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'bio-photosynthesis-3',
    title: 'Photosynthesis viability on low-light exoplanets is uncertain',
    summary: 'Claim under dispute; dependent on stellar spectrum and atmospheric composition assumptions.',
    fullContent: 'Modeling indicates that a red dwarf spectrum shifts photon energy toward longer wavelengths. Some photosynthetic pathways might adapt, but maintaining Earth-like yields requires atmospheric transparency and slow stellar flare activity.',
    sources: ['https://iopscience.iop.org/article/10.3847/PSJ/aaf1a9'],
    metadata: {
      created: new Date('2024-07-10T14:45:00Z'),
      updated: new Date('2024-07-26T08:20:00Z'),
      lastModified: new Date('2024-07-26T08:20:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'biology', category: 'domain' },
        { name: 'space', category: 'topic' },
        { name: 'photosynthesis', category: 'topic' },
        { name: 'exoplanets', category: 'topic' },
      ] as FactTag[],
      importance: 5,
      region: 'global',
    },
    status: 'flagged',
    votes: 158,
    comments: 23,
    author: 'anon-9921',
    updated: '1d ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },

  // Climate & Environment Facts
  {
    id: 'climate-warming-4',
    title: 'Arctic sea ice declined 13% per decade since 1979',
    summary: 'Satellite measurements show consistent Arctic sea ice loss, with accelerating trends in recent years.',
    fullContent: 'NASA and NSIDC data indicate Arctic sea ice extent has declined at a rate of 13% per decade since 1979. The decline accelerated after 2007, with record minimums occurring in 2012, 2016, and 2020. This reflects broader Arctic warming trends and albedo feedback loops.',
    sources: ['https://climate.nasa.gov/evidence/', 'https://nsidc.org/arcticseaicenews/'],
    metadata: {
      author: 'climate-researcher',
      created: new Date('2024-08-01T10:00:00Z'),
      updated: new Date('2024-08-15T14:30:00Z'),
      lastModified: new Date('2024-08-15T14:30:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'climate-change', category: 'topic' },
        { name: 'arctic', category: 'region' },
        { name: 'sea-ice', category: 'topic' },
        { name: 'environment', category: 'domain' },
      ] as FactTag[],
      importance: 9,
      region: 'arctic',
    },
    status: 'verified',
    votes: 892,
    comments: 156,
    author: 'climate-researcher',
    updated: '3h ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'renewable-energy-5',
    title: 'Solar power costs dropped 90% in the last decade',
    summary: 'IRENA reports dramatic cost reductions in solar photovoltaic technology, making it competitive with fossil fuels.',
    fullContent: 'The International Renewable Energy Agency (IRENA) reports that solar photovoltaic costs fell by 90% between 2010 and 2020. Utility-scale solar is now the cheapest source of power in most parts of the world, with costs continuing to decline due to technological improvements and economies of scale.',
    sources: ['https://www.irena.org/publications/2021/Jun/Renewable-Power-Generation-Costs-in-2020'],
    metadata: {
      author: 'energy-analyst',
      created: new Date('2024-07-20T09:15:00Z'),
      updated: new Date('2024-08-10T11:20:00Z'),
      lastModified: new Date('2024-08-10T11:20:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'renewable-energy', category: 'topic' },
        { name: 'solar-power', category: 'topic' },
        { name: 'economics', category: 'domain' },
        { name: 'technology', category: 'domain' },
      ] as FactTag[],
      importance: 7,
      region: 'global',
    },
    status: 'verified',
    votes: 654,
    comments: 98,
    author: 'energy-analyst',
    updated: '1d ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },

  // Technology & AI Facts
  {
    id: 'ai-language-models-6',
    title: 'Large language models require massive computational resources',
    summary: 'Training GPT-3 scale models requires thousands of GPUs and millions of dollars in compute costs.',
    fullContent: 'Training large language models like GPT-3 requires approximately 3,640 petaflop/s-days of computation, equivalent to running 1,000 V100 GPUs for 34 days. The estimated training cost is $4.6 million in compute alone, not including research and development overhead.',
    sources: ['https://arxiv.org/abs/2005.14165', 'https://lambdalabs.com/blog/demystifying-gpt-3/'],
    metadata: {
      author: 'ml-researcher',
      created: new Date('2024-08-05T16:45:00Z'),
      updated: new Date('2024-08-20T10:30:00Z'),
      lastModified: new Date('2024-08-20T10:30:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'artificial-intelligence', category: 'topic' },
        { name: 'machine-learning', category: 'topic' },
        { name: 'computational-resources', category: 'topic' },
        { name: 'technology', category: 'domain' },
      ] as FactTag[],
      importance: 6,
      region: 'global',
    },
    status: 'verified',
    votes: 445,
    comments: 67,
    author: 'ml-researcher',
    updated: '2d ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'quantum-computing-7',
    title: 'Quantum computers face decoherence challenges',
    summary: 'Quantum states are fragile and lose coherence quickly, requiring error correction and ultra-low temperatures.',
    fullContent: 'Current quantum computers operate at temperatures near absolute zero (15 millikelvin) to maintain quantum coherence. Decoherence times range from microseconds to milliseconds, limiting computation depth. Quantum error correction requires hundreds of physical qubits per logical qubit.',
    sources: ['https://www.nature.com/articles/nature23461', 'https://quantum-journal.org/papers/q-2018-08-06-79/'],
    metadata: {
      author: 'quantum-physicist',
      created: new Date('2024-07-30T13:20:00Z'),
      updated: new Date('2024-08-12T15:45:00Z'),
      lastModified: new Date('2024-08-12T15:45:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'quantum-computing', category: 'topic' },
        { name: 'physics', category: 'domain' },
        { name: 'decoherence', category: 'topic' },
        { name: 'error-correction', category: 'topic' },
      ] as FactTag[],
      importance: 7,
      region: 'global',
    },
    status: 'verified',
    votes: 387,
    comments: 54,
    author: 'quantum-physicist',
    updated: '4d ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },

  // Health & Medicine Facts
  {
    id: 'mrna-vaccines-8',
    title: 'mRNA vaccines use lipid nanoparticles for delivery',
    summary: 'COVID-19 mRNA vaccines package genetic material in lipid nanoparticles to enable cellular uptake.',
    fullContent: 'mRNA vaccines like Pfizer-BioNTech and Moderna use lipid nanoparticles (LNPs) to protect and deliver mRNA into cells. The LNPs contain ionizable lipids, phospholipids, cholesterol, and PEG-lipids that facilitate endosomal escape and protein expression.',
    sources: ['https://www.nature.com/articles/nrd.2017.243', 'https://www.nejm.org/doi/full/10.1056/NEJMoa2035389'],
    metadata: {
      author: 'immunologist',
      created: new Date('2024-07-25T08:30:00Z'),
      updated: new Date('2024-08-08T12:15:00Z'),
      lastModified: new Date('2024-08-08T12:15:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'vaccines', category: 'topic' },
        { name: 'mrna', category: 'topic' },
        { name: 'medicine', category: 'domain' },
        { name: 'nanotechnology', category: 'topic' },
      ] as FactTag[],
      importance: 8,
      region: 'global',
    },
    status: 'verified',
    votes: 723,
    comments: 123,
    author: 'immunologist',
    updated: '5d ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'crispr-gene-editing-9',
    title: 'CRISPR-Cas9 enables precise gene editing',
    summary: 'CRISPR technology allows targeted DNA modification with unprecedented precision and efficiency.',
    fullContent: 'CRISPR-Cas9 uses guide RNAs to direct the Cas9 nuclease to specific DNA sequences, creating double-strand breaks. Cellular repair mechanisms then introduce desired modifications through homologous recombination or non-homologous end joining.',
    sources: ['https://www.science.org/doi/10.1126/science.1225829', 'https://www.nature.com/articles/nbt.2623'],
    metadata: {
      author: 'geneticist',
      created: new Date('2024-08-02T11:00:00Z'),
      updated: new Date('2024-08-16T09:45:00Z'),
      lastModified: new Date('2024-08-16T09:45:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'gene-editing', category: 'topic' },
        { name: 'crispr', category: 'topic' },
        { name: 'genetics', category: 'domain' },
        { name: 'biotechnology', category: 'domain' },
      ] as FactTag[],
      importance: 9,
      region: 'global',
    },
    status: 'verified',
    votes: 612,
    comments: 89,
    author: 'geneticist',
    updated: '1d ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },

  // Economics & Finance Facts  
  {
    id: 'cryptocurrency-energy-10',
    title: 'Bitcoin mining consumes significant energy',
    summary: 'Bitcoin network energy consumption is comparable to entire countries like Argentina or Norway.',
    fullContent: 'The Cambridge Bitcoin Electricity Consumption Index estimates Bitcoin mining consumes approximately 120-140 TWh annually, comparable to countries like Argentina (131 TWh) or Norway (124 TWh). Energy intensity stems from proof-of-work consensus requiring computational power.',
    sources: ['https://ccaf.io/cbeci/index', 'https://digiconomist.net/bitcoin-energy-consumption/'],
    metadata: {
      author: 'crypto-analyst',
      created: new Date('2024-08-03T14:20:00Z'),
      updated: new Date('2024-08-18T16:30:00Z'),
      lastModified: new Date('2024-08-18T16:30:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'cryptocurrency', category: 'topic' },
        { name: 'bitcoin', category: 'topic' },
        { name: 'energy-consumption', category: 'topic' },
        { name: 'finance', category: 'domain' },
      ] as FactTag[],
      importance: 6,
      region: 'global',
    },
    status: 'verified',
    votes: 534,
    comments: 167,
    author: 'crypto-analyst',
    updated: '6h ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },

  // More diverse facts continuing the pattern...
  {
    id: 'ocean-microplastics-11',
    title: 'Microplastics found in deep ocean trenches',
    summary: 'Plastic particles smaller than 5mm have been detected in the deepest parts of the ocean.',
    fullContent: 'Research expeditions have found microplastics in the Mariana Trench at depths exceeding 10,000 meters. These particles originate from plastic waste that fragments over time and sinks through the water column, contaminating even the most remote marine environments.',
    sources: ['https://www.nature.com/articles/s41559-020-1230-3'],
    metadata: {
      author: 'marine-biologist',
      created: new Date('2024-07-28T10:15:00Z'),
      updated: new Date('2024-08-11T13:25:00Z'),
      lastModified: new Date('2024-08-11T13:25:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'ocean', category: 'topic' },
        { name: 'microplastics', category: 'topic' },
        { name: 'pollution', category: 'topic' },
        { name: 'environment', category: 'domain' },
      ] as FactTag[],
      importance: 8,
      region: 'global',
    },
    status: 'verified',
    votes: 678,
    comments: 94,
    author: 'marine-biologist',
    updated: '3d ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'neuroscience-memory-12',
    title: 'Memory consolidation occurs during sleep',
    summary: 'Sleep plays a crucial role in transferring information from temporary to long-term memory storage.',
    fullContent: 'During slow-wave sleep, the brain replays neural activity patterns from waking experiences, strengthening synaptic connections. The hippocampus transfers memories to the neocortex through theta oscillations and sleep spindles, consolidating learning.',
    sources: ['https://www.nature.com/articles/nature05278', 'https://science.sciencemag.org/content/326/5956/1086'],
    metadata: {
      author: 'neuroscientist',
      created: new Date('2024-08-06T15:40:00Z'),
      updated: new Date('2024-08-19T11:50:00Z'),
      lastModified: new Date('2024-08-19T11:50:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'neuroscience', category: 'domain' },
        { name: 'memory', category: 'topic' },
        { name: 'sleep', category: 'topic' },
        { name: 'brain', category: 'topic' },
      ] as FactTag[],
      importance: 7,
      region: 'global',
    },
    status: 'verified',
    votes: 456,
    comments: 78,
    author: 'neuroscientist',
    updated: '2h ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'plant-communication-13',
    title: 'Plants communicate through underground fungal networks',
    summary: 'Mycorrhizal networks enable plants to share resources and information across forest ecosystems.',
    fullContent: 'Trees and plants form symbiotic relationships with mycorrhizal fungi, creating underground networks spanning entire forests. These "wood wide webs" facilitate nutrient sharing, stress signaling, and communication between plants, with larger trees supporting younger seedlings.',
    sources: ['https://www.nature.com/articles/nature11892', 'https://www.science.org/doi/10.1126/science.aab1772'],
    metadata: {
      author: 'forest-ecologist',
      created: new Date('2024-07-22T12:30:00Z'),
      updated: new Date('2024-08-04T14:15:00Z'),
      lastModified: new Date('2024-08-04T14:15:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'plants', category: 'topic' },
        { name: 'fungi', category: 'topic' },
        { name: 'ecology', category: 'domain' },
        { name: 'communication', category: 'topic' },
      ] as FactTag[],
      importance: 6,
      region: 'global',
    },
    status: 'verified',
    votes: 389,
    comments: 65,
    author: 'forest-ecologist',
    updated: '2w ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  
  // Additional diverse facts
  {
    id: 'dark-matter-14',
    title: 'Dark matter comprises 27% of the universe',
    summary: 'Cosmological observations indicate dark matter makes up more than a quarter of the universe\'s mass-energy.',
    fullContent: 'Current models based on cosmic microwave background radiation, galaxy rotation curves, and gravitational lensing suggest dark matter constitutes approximately 27% of the universe\'s total mass-energy density, with ordinary matter only accounting for 5%.',
    sources: ['https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_reveals_an_almost_perfect_Universe'],
    metadata: {
      author: 'cosmologist',
      created: new Date('2024-08-07T09:25:00Z'),
      updated: new Date('2024-08-21T15:10:00Z'),
      lastModified: new Date('2024-08-21T15:10:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'dark-matter', category: 'topic' },
        { name: 'cosmology', category: 'domain' },
        { name: 'universe', category: 'topic' },
        { name: 'physics', category: 'domain' },
      ] as FactTag[],
      importance: 9,
      region: 'global',
    },
    status: 'verified',
    votes: 812,
    comments: 143,
    author: 'cosmologist',
    updated: '1h ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'antibiotic-resistance-15',
    title: 'Antibiotic resistance kills 700,000 people annually',
    summary: 'Drug-resistant infections cause significant global mortality, with projections reaching 10 million by 2050.',
    fullContent: 'The World Health Organization reports approximately 700,000 deaths annually from antibiotic-resistant infections. Without intervention, antimicrobial resistance could cause 10 million deaths per year by 2050, exceeding cancer mortality.',
    sources: ['https://www.who.int/news-room/detail/29-04-2019-new-report-calls-for-urgent-action-to-avert-antimicrobial-resistance-crisis'],
    metadata: {
      author: 'epidemiologist',
      created: new Date('2024-07-18T11:45:00Z'),
      updated: new Date('2024-08-03T16:20:00Z'),
      lastModified: new Date('2024-08-03T16:20:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'antibiotic-resistance', category: 'topic' },
        { name: 'public-health', category: 'domain' },
        { name: 'mortality', category: 'topic' },
        { name: 'medicine', category: 'domain' },
      ] as FactTag[],
      importance: 9,
      region: 'global',
    },
    status: 'verified',
    votes: 567,
    comments: 92,
    author: 'epidemiologist',
    updated: '3w ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'fusion-energy-16',
    title: 'Nuclear fusion achieved net energy gain in 2022',
    summary: 'Lawrence Livermore National Laboratory achieved fusion ignition, producing more energy than input.',
    fullContent: 'On December 5, 2022, researchers at the National Ignition Facility achieved nuclear fusion ignition, generating 3.15 megajoules of energy from 2.05 megajoules of laser input. This represents the first controlled fusion reaction to achieve net energy gain.',
    sources: ['https://www.llnl.gov/news/national-ignition-facility-achieves-fusion-ignition'],
    metadata: {
      author: 'plasma-physicist',
      created: new Date('2024-08-09T14:30:00Z'),
      updated: new Date('2024-08-22T10:45:00Z'),
      lastModified: new Date('2024-08-22T10:45:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'nuclear-fusion', category: 'topic' },
        { name: 'energy', category: 'topic' },
        { name: 'physics', category: 'domain' },
        { name: 'breakthrough', category: 'urgency' },
      ] as FactTag[],
      importance: 10,
      region: 'global',
    },
    status: 'verified',
    votes: 923,
    comments: 201,
    author: 'plasma-physicist',
    updated: '30m ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'insect-decline-17',
    title: 'Global insect populations declined 25% in 30 years',
    summary: 'Systematic review shows widespread insect decline with implications for ecosystems and food security.',
    fullContent: 'A comprehensive analysis of 166 long-term surveys found global insect abundance declined by 24% from 1990 to 2018. Terrestrial insects declined faster than aquatic species, with particularly severe impacts on Lepidoptera, Hymenoptera, and Coleoptera orders.',
    sources: ['https://www.science.org/doi/10.1126/science.aax9931'],
    metadata: {
      author: 'entomologist',
      created: new Date('2024-07-15T08:20:00Z'),
      updated: new Date('2024-07-29T12:35:00Z'),
      lastModified: new Date('2024-07-29T12:35:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'insects', category: 'topic' },
        { name: 'biodiversity', category: 'topic' },
        { name: 'ecology', category: 'domain' },
        { name: 'decline', category: 'urgency' },
      ] as FactTag[],
      importance: 8,
      region: 'global',
    },
    status: 'verified',
    votes: 445,
    comments: 76,
    author: 'entomologist',
    updated: '4w ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'brain-organoids-18',
    title: 'Lab-grown brain organoids develop neural networks',
    summary: 'Human brain organoids grown in vitro show spontaneous electrical activity resembling fetal brains.',
    fullContent: 'Researchers have successfully grown brain organoids from human stem cells that develop complex neural networks. These mini-brains exhibit spontaneous electrical activity patterns similar to preterm infants, enabling studies of brain development and neurological disorders.',
    sources: ['https://www.nature.com/articles/s41586-019-1654-9'],
    metadata: {
      author: 'neurodevelopment-researcher',
      created: new Date('2024-08-11T13:15:00Z'),
      updated: new Date('2024-08-25T09:30:00Z'),
      lastModified: new Date('2024-08-25T09:30:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'organoids', category: 'topic' },
        { name: 'neuroscience', category: 'domain' },
        { name: 'brain-development', category: 'topic' },
        { name: 'stem-cells', category: 'topic' },
      ] as FactTag[],
      importance: 7,
      region: 'global',
    },
    status: 'verified',
    votes: 334,
    comments: 58,
    author: 'neurodevelopment-researcher',
    updated: '12h ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'ocean-acidification-19',
    title: 'Ocean pH decreased 0.1 units since Industrial Revolution',
    summary: 'Seawater has become 30% more acidic due to CO2 absorption, threatening marine ecosystems.',
    fullContent: 'The ocean has absorbed about 30% of human CO2 emissions, decreasing surface pH from 8.2 to 8.1 since the Industrial Revolution. This 0.1 unit decrease represents a 30% increase in acidity, threatening coral reefs, shellfish, and marine food webs.',
    sources: ['https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification'],
    metadata: {
      author: 'marine-chemist',
      created: new Date('2024-07-12T10:40:00Z'),
      updated: new Date('2024-07-26T14:55:00Z'),
      lastModified: new Date('2024-07-26T14:55:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'ocean-acidification', category: 'topic' },
        { name: 'climate-change', category: 'topic' },
        { name: 'marine-ecosystem', category: 'topic' },
        { name: 'chemistry', category: 'domain' },
      ] as FactTag[],
      importance: 8,
      region: 'global',
    },
    status: 'verified',
    votes: 512,
    comments: 87,
    author: 'marine-chemist',
    updated: '4w ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'metamaterial-physics-20',
    title: 'Metamaterials enable invisibility cloaking at microwave frequencies',
    summary: 'Artificially structured materials can bend electromagnetic waves around objects, achieving partial invisibility.',
    fullContent: 'Metamaterials with negative refractive indices can redirect electromagnetic radiation around objects. Researchers have demonstrated microwave cloaking devices that render objects nearly invisible at specific frequencies, with potential applications in stealth technology and antenna design.',
    sources: ['https://www.science.org/doi/10.1126/science.1133628', 'https://www.nature.com/articles/nature05248'],
    metadata: {
      author: 'materials-scientist',
      created: new Date('2024-08-04T16:10:00Z'),
      updated: new Date('2024-08-17T11:25:00Z'),
      lastModified: new Date('2024-08-17T11:25:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'metamaterials', category: 'topic' },
        { name: 'optics', category: 'topic' },
        { name: 'physics', category: 'domain' },
        { name: 'invisibility', category: 'topic' },
      ] as FactTag[],
      importance: 6,
      region: 'global',
    },
    status: 'verified',
    votes: 278,
    comments: 42,
    author: 'materials-scientist',
    updated: '1w ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  },
  {
    id: 'gut-microbiome-21',
    title: 'Gut microbiome influences mental health through vagus nerve',
    summary: 'The gut-brain axis enables bidirectional communication between intestinal bacteria and the central nervous system.',
    fullContent: 'Research demonstrates that gut microbiota produce neurotransmitters like serotonin, GABA, and dopamine. These signals reach the brain via the vagus nerve, influencing mood, anxiety, and cognitive function. Dysbiosis is linked to depression and neurological disorders.',
    sources: ['https://www.nature.com/articles/nrmicro.2016.85', 'https://www.cell.com/cell/fulltext/S0092-8674(16)31590-2'],
    metadata: {
      author: 'microbiome-researcher',
      created: new Date('2024-07-31T12:50:00Z'),
      updated: new Date('2024-08-14T08:15:00Z'),
      lastModified: new Date('2024-08-14T08:15:00Z'),
      version: 1,
      contentType: 'text/plain' as const,
      tags: [
        { name: 'microbiome', category: 'topic' },
        { name: 'mental-health', category: 'topic' },
        { name: 'gut-brain-axis', category: 'topic' },
        { name: 'microbiology', category: 'domain' },
      ] as FactTag[],
      importance: 7,
      region: 'global',
    },
    status: 'verified',
    votes: 467,
    comments: 83,
    author: 'microbiome-researcher',
    updated: '1w ago',
    walrusBlobId: undefined,
    contentHash: undefined,
  }
];

let seeded = false;
let seedingPromise: Promise<void> | null = null;

export async function ensureSeedFacts(): Promise<void> {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  // Check if we have the basic seeded facts (not user-submitted ones)
  const walrusIndex = getWalrusIndexManager();
  const mainIndex = await walrusIndex.getMainIndex();
  const hasSeededFacts = SAMPLE_FACTS.some(sample => 
    mainIndex.facts.some(factMeta => factMeta.id === sample.id)
  );

  if (hasSeededFacts) {
    seeded = true;
    return;
  }

  if (seedingPromise) {
    return seedingPromise;
  }

  seedingPromise = (async () => {
    try {
      const walrus = initializeWalrusFromEnv();
      await walrus.initialize();

      // Only seed facts that don't already exist
      const currentIndex = await walrusIndex.getMainIndex();
      const existingFactIds = new Set(currentIndex.facts.map(f => f.id));

      for (const sample of SAMPLE_FACTS) {
        // Skip if this seeded fact already exists
        if (existingFactIds.has(sample.id)) {
          continue;
        }

        console.log(`Seeding fact: ${sample.id}`);

        // Normalize the fact before storing
        const normalizedFact = normalizeFullFact(sample);

        // Store the full fact as JSON to Walrus
        const factData = JSON.stringify({
          id: normalizedFact.id,
          title: normalizedFact.title,
          summary: normalizedFact.summary,
          status: normalizedFact.status,
          votes: normalizedFact.votes,
          comments: normalizedFact.comments,
          author: normalizedFact.author,
          updated: normalizedFact.updated,
          fullContent: normalizedFact.fullContent,
          sources: normalizedFact.sources,
          metadata: normalizedFact.metadata,
        });

        const storeResult = await walrus.storage.storeBlob(factData, {
          mimeType: 'application/json'
        });

        const fact: Fact = {
          id: normalizedFact.id,
          title: normalizedFact.title,
          summary: normalizedFact.summary,
          status: normalizedFact.status,
          votes: normalizedFact.votes,
          comments: normalizedFact.comments,
          author: normalizedFact.author,
          updated: normalizedFact.updated,
          walrusBlobId: storeResult.metadata.blobId,
          contentHash: normalizedFact.contentHash,
          metadata: normalizedFact.metadata,
        };

        // Add to Walrus index (this stores the index on Walrus)
        await walrusIndex.addFactToIndex(fact, storeResult.metadata.blobId);
        console.log(`✓ Seeded fact ${fact.id} with blob ID: ${storeResult.metadata.blobId}`);
      }

      seeded = true;
    } catch (error) {
      console.error('Failed to seed sample facts:', error);
    } finally {
      seedingPromise = null;
    }
  })();

  return seedingPromise;
}

