import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="cursor-pointer">1. Quais são os requisitos técnicos para usar o SASI?</AccordionTrigger>
        <AccordionContent>
          Apenas um computador com acesso à internet. Não é necessário instalar nenhum software.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="cursor-pointer">2. Como é feita a integração com os sistemas existentes?</AccordionTrigger>
        <AccordionContent>
          Nossa equipe cuida de toda a integração com os sistemas municipais e estaduais de forma segura e padronizada.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="cursor-pointer">3. Há treinamento para os gestores?</AccordionTrigger>
        <AccordionContent>
          Sim, oferecemos treinamento completo e suporte contínuo para todas as equipes que adotam o SASI.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="cursor-pointer">4. Quais garantias de segurança dos dados?</AccordionTrigger>
        <AccordionContent>
          Seguimos rigorosamente a LGPD e utilizamos criptografia de ponta a ponta em todas as transações de dados.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger className="cursor-pointer">5. Como posso solicitar uma demonstração?</AccordionTrigger>
        <AccordionContent>
          Preencha o formulário acima ou entre em contato pelo email <u>contato@sasi.net.br</u> que agendaremos uma apresentação online.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}