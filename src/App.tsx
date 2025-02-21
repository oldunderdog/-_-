import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';

interface Organization {
  shortName: string;
  fullName: string;
  inn: string;
  kpp: string;
  ogrn: string;
  legalAddress: string;
  actualAddress: string;
  mainActivity: string;
  phones: string[];
}

// Mock data for companies
const mockCompanies: Organization[] = [
  {
    shortName: 'ООО "ТЕХНОПРОМ"',
    fullName: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ТЕХНОПРОМ"',
    inn: '7701234567',
    kpp: '770101001',
    ogrn: '1027700123456',
    legalAddress: '101000, ГОРОД МОСКВА, УЛИЦА ПУШКИНА, Д. 10',
    actualAddress: '101000, ГОРОД МОСКВА, УЛИЦА ПУШКИНА, Д. 10, ОФИС 501',
    mainActivity: '62.01 Разработка компьютерного программного обеспечения',
    phones: ['+7 (495) 123-45-67']
  },
  {
    shortName: 'АО "СТРОЙИНВЕСТ"',
    fullName: 'АКЦИОНЕРНОЕ ОБЩЕСТВО "СТРОЙИНВЕСТ"',
    inn: '7702345678',
    kpp: '770201001',
    ogrn: '1027700234567',
    legalAddress: '102000, ГОРОД МОСКВА, ПРОСПЕКТ ЛЕНИНА, Д. 15',
    actualAddress: '102000, ГОРОД МОСКВА, ПРОСПЕКТ ЛЕНИНА, Д. 15, ЭТАЖ 3',
    mainActivity: '41.20 Строительство жилых и нежилых зданий',
    phones: ['+7 (495) 234-56-78', '+7 (495) 234-56-79']
  },
  {
    shortName: 'ООО "ТОРГОВЫЙ ДОМ"',
    fullName: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ТОРГОВЫЙ ДОМ"',
    inn: '7703456789',
    kpp: '770301001',
    ogrn: '1027700345678',
    legalAddress: '103000, ГОРОД МОСКВА, УЛИЦА ТВЕРСКАЯ, Д. 20',
    actualAddress: '103000, ГОРОД МОСКВА, УЛИЦА ТВЕРСКАЯ, Д. 20, ПОМЕЩЕНИЕ 1',
    mainActivity: '46.90 Неспециализированная оптовая торговля',
    phones: ['+7 (495) 345-67-89']
  }
];

interface Document {
  type: string;
  series?: string;
  number?: string;
  issueDate?: string;
  issuedBy?: string;
  departmentCode?: string;
}

function App() {
  const [entityType, setEntityType] = useState<'individual' | 'legal'>('individual');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [position, setPosition] = useState('');
  const [documents, setDocuments] = useState<Document[]>([
    { type: 'Паспорт РФ' }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Organization[]>([]);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [phones, setPhones] = useState<string[]>(['']);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = mockCompanies.filter(company => 
        company.inn.includes(searchTerm) || 
        company.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  const selectCompany = (company: Organization) => {
    setOrganization(company);
    setPhones(company.phones);
    setSearchTerm(company.shortName);
    setShowDropdown(false);
  };

  const addDocument = (type: string) => {
    setDocuments([...documents, { type }]);
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const updateDocument = (index: number, field: keyof Document, value: string) => {
    const newDocuments = [...documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setDocuments(newDocuments);
  };

  const addPhone = () => {
    setPhones([...phones, '']);
  };

  const updatePhone = (index: number, value: string) => {
    const newPhones = [...phones];
    newPhones[index] = value;
    setPhones(newPhones);
  };

  const removePhone = (index: number) => {
    setPhones(phones.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Единоличный исполнительный орган</h2>
          
          <div className="mb-6">
            <div className="inline-flex p-1 bg-gray-100 rounded-lg">
              <button
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  entityType === 'individual'
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setEntityType('individual')}
              >
                Физ. лицо
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  entityType === 'legal'
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setEntityType('legal')}
              >
                Юр. лицо
              </button>
            </div>
          </div>

          {entityType === 'individual' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отчество</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Дата рождения</label>
                <input
                  type="date"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Например: Генеральный директор"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефоны</label>
                {phones.map((phone, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="tel"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={phone}
                      onChange={(e) => updatePhone(index, e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                    />
                    {phones.length > 1 && (
                      <button
                        onClick={() => removePhone(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addPhone}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Plus size={20} className="mr-1" />
                  Добавить телефон
                </button>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Документы</h3>
                {documents.map((doc, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-gray-700">{doc.type}</span>
                      {index > 0 && (
                        <button
                          onClick={() => removeDocument(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>

                    {doc.type === 'Паспорт РФ' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Серия</label>
                          <input
                            type="text"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={doc.series || ''}
                            onChange={(e) => updateDocument(index, 'series', e.target.value)}
                            maxLength={4}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Номер</label>
                          <input
                            type="text"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={doc.number || ''}
                            onChange={(e) => updateDocument(index, 'number', e.target.value)}
                            maxLength={6}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Дата выдачи</label>
                          <input
                            type="date"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={doc.issueDate || ''}
                            onChange={(e) => updateDocument(index, 'issueDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Код подразделения</label>
                          <input
                            type="text"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={doc.departmentCode || ''}
                            onChange={(e) => updateDocument(index, 'departmentCode', e.target.value)}
                            maxLength={7}
                            placeholder="000-000"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Кем выдан</label>
                          <input
                            type="text"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={doc.issuedBy || ''}
                            onChange={(e) => updateDocument(index, 'issuedBy', e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {doc.type === 'СНИЛС' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Номер СНИЛС</label>
                        <input
                          type="text"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={doc.number || ''}
                          onChange={(e) => updateDocument(index, 'number', e.target.value)}
                          maxLength={14}
                          placeholder="000-000-000 00"
                        />
                      </div>
                    )}

                    {doc.type === 'ИНН' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Номер ИНН</label>
                        <input
                          type="text"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={doc.number || ''}
                          onChange={(e) => updateDocument(index, 'number', e.target.value)}
                          maxLength={12}
                          placeholder="000000000000"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex gap-2">
                  {!documents.some(doc => doc.type === 'СНИЛС') && (
                    <button
                      onClick={() => addDocument('СНИЛС')}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Plus size={20} className="mr-1" />
                      Добавить СНИЛС
                    </button>
                  )}
                  {!documents.some(doc => doc.type === 'ИНН') && (
                    <button
                      onClick={() => addDocument('ИНН')}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Plus size={20} className="mr-1" />
                      Добавить ИНН
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Поиск по ИНН или названию организации
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Введите ИНН или название организации"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  
                  {showDropdown && searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                      {searchResults.map((company, index) => (
                        <div
                          key={company.inn}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                            index !== searchResults.length - 1 ? 'border-b border-gray-100' : ''
                          }`}
                          onClick={() => selectCompany(company)}
                        >
                          <div className="font-medium text-gray-900">{company.shortName}</div>
                          <div className="text-sm text-gray-500">ИНН: {company.inn}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {organization && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Краткое наименование</label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                      value={organization.shortName}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Полное наименование</label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                      value={organization.fullName}
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ИНН</label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                        value={organization.inn}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">КПП</label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                        value={organization.kpp}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ОГРН</label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                        value={organization.ogrn}
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Юридический адрес</label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                      value={organization.legalAddress}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Фактический адрес</label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                      value={organization.actualAddress}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Основной вид деятельности</label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                      value={organization.mainActivity}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефоны</label>
                    {phones.map((phone, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="tel"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={phone}
                          onChange={(e) => updatePhone(index, e.target.value)}
                          placeholder="+7 (___) ___-__-__"
                        />
                        {phones.length > 1 && (
                          <button
                            onClick={() => removePhone(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addPhone}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Plus size={20} className="mr-1" />
                      Добавить телефон
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;