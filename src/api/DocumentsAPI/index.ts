import ApiInstance from '@/api/index'

export const DocumentsAPI = {
  getDocuments(){ 
     const url = '/user/docs';
     return ApiInstance.get(url);
  }, 
  searchQuery(documentType: string) {
    const url = `/user/docs?=${documentType}`;
     return ApiInstance.get(url); 
  },
}