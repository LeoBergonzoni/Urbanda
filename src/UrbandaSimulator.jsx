import React, { useState } from 'react';
import { Card } from './components/ui/Card';
import { CardContent } from './components/ui/CardContent';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { Label } from './components/ui/Label';
import { Select } from './components/ui/Select';
import { SelectItem } from './components/ui/SelectItem';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

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

  const [gptResponse, setGptResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fetchChatGPTResponse = async (formData) => {
    const prompt = `
Se parto da ${formData.fromCity} e mi trasferisco a ${formData.toCity},
considerato che viviamo in ${formData.people} persone, ci muoviamo con ${formData.transport},
usciamo ${formData.outings} volte a settimana, abbiamo come hobby ${formData.hobbies},
modello auto ${formData.carModel}, abbonamenti ${formData.subscriptions},
e tenendo conto del costo della vita medio nella città di destinazione:

Calcola:
• Costo stimato mensile nella città ${formData.toCity};
• Differenza rispetto a ${formData.fromCity};
• Una tabella comparativa tra le due città con le seguenti voci: affitto, trasporti, spesa, utenze, hobby.

Restituisci la risposta in forma testuale leggibile, con tabella ben formattata (es. markdown).
    `;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Sei un esperto di costo della vita e valutazioni comparative tra città." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Nessuna risposta generata.";
  };

  const handleSubmit = async () => {
    if (!formData.fromCity || !formData.toCity) {
      alert("Inserisci entrambe le città.");
      return;
    }

    setLoading(true);
    const response = await fetchChatGPTResponse(formData);
    setGptResponse(response);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-2">Urbanda</h1>
        <p className="text-lg text-gray-600">Scopri quanto costa vivere in una nuova città, in base al tuo stile di vita.</p>
        <p className="text-md text-gray-500 mt-2">Confronta affitti, trasporti, spesa e tempo libero tra due città. Analisi generata da AI.</p>
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

            <Label className="mt-2">Hobby</Label>
            <Input placeholder="Es. palestra, cinema..." onChange={e => handleChange('hobbies', e.target.value)} />

            <Label className="mt-2">Modello auto</Label>
            <Input placeholder="Es. Fiat Panda GPL" onChange={e => handleChange('carModel', e.target.value)} />

            <Label className="mt-2">Abbonamenti</Label>
            <Input placeholder="Es. Netflix, palestra..." onChange={e => handleChange('subscriptions', e.target.value)} />

            <div className="flex justify-end mt-4">
              <Button onClick={handleSubmit}>{loading ? 'Attendi...' : 'Calcola con AI'}</Button>
            </div>

            {gptResponse && (
              <div className="mt-6 bg-gray-100 p-4 rounded-xl whitespace-pre-wrap text-sm">
                {gptResponse}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200 shadow">
          <CardContent>
            <h3 className="text-lg font-semibold">Perché scegliere Urbanda</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
              <li>Personalizzato sul tuo stile di vita, non su medie generiche</li>
              <li>Analisi generata da AI per oltre 1000 città nel mondo</li>
              <li>Report dettagliato: affitto, trasporti, hobby, utenze</li>
              <li>Perfetto per nomadi digitali, famiglie, studenti e freelance</li>
            </ul>
            <Button className="mt-4" variant="ghost">Scopri di più</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}