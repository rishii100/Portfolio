// Client-side vector similarity search for RAG
import { portfolioChunks } from '../data/portfolioData';

export class VectorSearch {
  static cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  static simpleTokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }

  static createSimpleVector(text, vocabulary) {
    const tokens = this.simpleTokenize(text);
    const vector = new Array(vocabulary.length).fill(0);
    
    tokens.forEach(token => {
      const index = vocabulary.indexOf(token);
      if (index !== -1) {
        vector[index] += 1;
      }
    });
    
    return vector;
  }

  static buildVocabulary() {
    const allWords = new Set();
    
    portfolioChunks.forEach(chunk => {
      const words = this.simpleTokenize(chunk.content + ' ' + chunk.keywords.join(' '));
      words.forEach(word => allWords.add(word));
    });
    
    return Array.from(allWords);
  }

  static searchSimilar(query, topK = 3) {
    const vocabulary = this.buildVocabulary();
    const queryVector = this.createSimpleVector(query, vocabulary);
    
    const results = portfolioChunks.map(chunk => {
      const chunkVector = this.createSimpleVector(
        chunk.content + ' ' + chunk.keywords.join(' '), 
        vocabulary
      );
      
      const similarity = this.cosineSimilarity(queryVector, chunkVector);
      
      return {
        ...chunk,
        similarity: similarity || 0
      };
    });
    
    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .filter(result => result.similarity > 0.1); // Minimum similarity threshold
  }

  static keywordSearch(query, topK = 3) {
    const queryWords = this.simpleTokenize(query);
    
    const results = portfolioChunks.map(chunk => {
      let score = 0;
      
      // Check content matches
      queryWords.forEach(word => {
        if (chunk.content.toLowerCase().includes(word)) {
          score += 2;
        }
        if (chunk.keywords.some(keyword => keyword.includes(word))) {
          score += 3;
        }
      });
      
      return {
        ...chunk,
        score: score
      };
    });
    
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .filter(result => result.score > 0);
  }

  static hybridSearch(query, topK = 3) {
    const vectorResults = this.searchSimilar(query, topK * 2);
    const keywordResults = this.keywordSearch(query, topK * 2);
    
    // Combine and deduplicate results
    const combinedResults = new Map();
    
    vectorResults.forEach(result => {
      combinedResults.set(result.id, {
        ...result,
        combinedScore: result.similarity * 0.6
      });
    });
    
    keywordResults.forEach(result => {
      if (combinedResults.has(result.id)) {
        const existing = combinedResults.get(result.id);
        existing.combinedScore += (result.score / 10) * 0.4;
      } else {
        combinedResults.set(result.id, {
          ...result,
          combinedScore: (result.score / 10) * 0.4
        });
      }
    });
    
    return Array.from(combinedResults.values())
      .sort((a, b) => b.combinedScore - a.combinedScore)
      .slice(0, topK);
  }
}