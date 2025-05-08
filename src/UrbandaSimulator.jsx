import React, { useState } from 'react';
import { Card } from './components/ui/Card';
import { CardContent } from './components/ui/CardContent';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { Label } from './components/ui/Label';
import { Select } from './components/ui/Select';
import { SelectItem } from './components/ui/SelectItem';
import { mockPrices } from './mockData';

export default function UrbandaSimulator() {
  const [formData, setFormData] = useState({
    fromCity: '',
    toCity: '',
    people: 1,
    transport: 'public',
    outings: 2,
    hobbies: '',
    carModel: '',
    subscriptions: ''
  });

  const [isPro, setIsPro] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const from = mockPrices[formData.fromCity];
    const to = mockPrices[formData.toCity];
  
    if (!from || !to) {
      alert("Inserisci città valide tra: Roma, Bologna, Milano, Napoli, Trento");
      return;
    }
  
    const totalFrom = Object.values(from).reduce((a, b) => a + b, 0);
    const totalTo = Object.values(to).reduce((a, b) => a + b, 0);
    const proExtras = isPro ? 100 : 0;
  
    setResult({
      total: totalTo + proExtras,
      cityDelta: totalTo - totalFrom,
      details: {
        from,
        to
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-2">Urbanda</h1>
        <p className="text-lg text-gray-600">Scopri quanto costa vivere in una nuova città, in base al tuo stile di vita.</p>
        <p className="text-md text-gray-500 mt-2">Confronta affitti, trasporti, spesa e tempo libero tra due città. Versione gratuita o Pro per analisi avanzate.</p>
        <Button className="mt-4">Prova il Simulatore</Button>
      </section>

      <section className="grid md:grid-cols-2 gap-4 my-8">
        <Card className="p-4 shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Simulatore Urbanda</h2>

            <Label>Città di partenza</Label>
            <Input placeholder="Es. Milano" onChange={e => handleChange('fromCity', e.target.value)} />

            <Label className="mt-2">Città di destinazione</Label>
            <Input placeholder="Es. Bologna" onChange={e => handleChange('toCity', e.target.value)} />

            <Label className="mt-2">Numero di persone</Label>
            <Input type="number" min={1} defaultValue={1} onChange={e => handleChange('people', parseInt(e.target.value))} />

            <Label className="mt-2">Tipo di trasporto</Label>
            <Select onValueChange={value => handleChange('transport', value)} placeholder="Seleziona un'opzione">
              <SelectItem value="public">Mezzi pubblici</SelectItem>
              <SelectItem value="car">Auto</SelectItem>
              <SelectItem value="bike">Bicicletta</SelectItem>
              <SelectItem value="scooter">Monopattino</SelectItem>
            </Select>

            <Label className="mt-2">Uscite settimanali</Label>
            <Input type="number" min={0} defaultValue={2} onChange={e => handleChange('outings', parseInt(e.target.value))} />

            {isPro && (
              <>
                <Label className="mt-2">Hobby</Label>
                <Input placeholder="Es. palestra, cinema..." onChange={e => handleChange('hobbies', e.target.value)} />

                <Label className="mt-2">Modello auto</Label>
                <Input placeholder="Es. Fiat Panda GPL" onChange={e => handleChange('carModel', e.target.value)} />

                <Label className="mt-2">Abbonamenti</Label>
                <Input placeholder="Es. Netflix, palestra..." onChange={e => handleChange('subscriptions', e.target.value)} />
              </>
            )}

            <div className="flex justify-between mt-4">
              <Button onClick={handleSubmit}>Calcola</Button>
              <Button variant="outline" onClick={() => setIsPro(!isPro)}>
                {isPro ? 'Versione Free' : 'Passa a Pro'}
              </Button>
            </div>

            {result && (
              <div className="mt-6 bg-gray-100 p-4 rounded-xl">
                <h2 className="text-lg font-semibold">Risultato:</h2>
                <p>Costo stimato mensile: €{result.total}</p>
                <p>Delta con città di partenza: {result.cityDelta > 0 ? '+' : ''}{result.cityDelta}€</p>

                <h3 className="text-md font-semibold mt-4">Dettaglio confronto:</h3>
                <table className="mt-2 w-full text-sm text-left border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 border">Voce</th>
                      <th className="p-2 border">{formData.fromCity}</th>
                      <th className="p-2 border">{formData.toCity}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(result.details.from).map((key) => (
                      <tr key={key}>
                        <td className="p-2 border capitalize">{key}</td>
                        <td className="p-2 border">€{result.details.from[key]}</td>
                        <td className="p-2 border">€{result.details.to[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200 shadow">
          <CardContent>
            <h3 className="text-lg font-semibold">Perché scegliere Urbanda</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
              <li>Personalizzato sul tuo stile di vita, non su medie generiche</li>
              <li>Confronto immediato tra oltre 100 città italiane ed europee</li>
              <li>Scenari reali: affitto, auto, abbonamenti, tempo libero</li>
              <li>Report PDF professionale (versione Pro)</li>
              <li>Affiliazioni con coworking, coliving, immobiliari</li>
            </ul>
            <Button className="mt-4" variant="ghost">Passa alla versione Pro</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}