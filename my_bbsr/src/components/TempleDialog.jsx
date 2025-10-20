import React,{useState} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const TempleDialog = () => {

    const [selectedTemple, setSelectedTemple] = useState(null);

  return (
         <Dialog open={selectedTemple !== null} onOpenChange={() => setSelectedTemple(null)}>
        <DialogContent className="max-w-2xl">
          {selectedTemple && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-amber-800">{selectedTemple.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={selectedTemple.image}
                  alt={selectedTemple.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <DialogDescription className="text-base text-stone-700">
                  {selectedTemple.history}
                </DialogDescription>
                <div className="flex items-center space-x-4 text-stone-600">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-amber-700" />
                    <span>{selectedTemple.timing}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-amber-700" />
                    <span>{selectedTemple.location}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

  )
}

export default TempleDialog